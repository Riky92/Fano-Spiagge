import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Prenotazione } from '../model/prenotazione';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  prenotazioni = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpService) {
      this.plt.ready().then(() => {
        const conn = this.sqlite.create({
          name: 'prenotazioni.db',
          location: 'default'
        })
        console.log('connection', conn)
        conn.then((db: SQLiteObject) => {
            this.database = db;
            this.seedDatabase();

        });
      });
  }

  seedDatabase() {
    this.http.get('assets/db/prenotazioni.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadPrenotazioni();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getPrenotazioni(): Observable<Prenotazione[]> {
    return this.prenotazioni.asObservable();
  }

  getPrenotazioniMock() {
    return this.http.get('/assets/data/prenotazioni.json');
  }

  loadPrenotazioni() {
    return this.database.executeSql('SELECT * FROM prenotazioni', []).then(data => {
      const prenotazioniList: Prenotazione[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          prenotazioniList.push({
            id: data.rows.item(i).id,
            codSpiaggia: data.rows.item(i).codSpiaggia,
            descSpiaggia: data.rows.item(i).descSpiaggia,
            ombrellone: data.rows.item(i).ombrellone,
            dataPrenotazione: data.rows.item(i).dataPrenotazione,
            nlettini: data.rows.item(i).nlettini,
            nsdraie: data.rows.item(i).nsdraie,
            prezzo: data.rows.item(i).prezzo,
            user: data.rows.item(i).user,
           });
        }
      }
      this.prenotazioni.next(prenotazioniList);
    });
  }

  addPrenotazione(spiaggia,ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) {
    const prenotazione = [spiaggia, ombrellone,dataPrenotazione, nlettini, nsdraie, prezzo, user];
    return this.database.executeSql(
      'INSERT INTO prenotazioni (spiaggia, ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) VALUES (?, ?, ?, ?, ?, ?)',
       prenotazione)
      .then(data => {
      this.loadPrenotazioni();
    });
  }

  getPrenotazione(id): Promise<Prenotazione> {
    return this.database.executeSql('SELECT * FROM prenotazioni WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        codSpiaggia: data.rows.item(0).codSpiaggia,
        descSpiaggia: data.rows.item(0).descSpiaggia,
        ombrellone: data.rows.item(0).ombrellone,
        dataPrenotazione: data.rows.item(0).dataPrenotazione,
        nlettini: data.rows.item(0).nlettini,
        nsdraie: data.rows.item(0).nsdraie,
        prezzo: data.rows.item(0).prezzo,
        user: data.rows.item(0).user
      }
    });
  }

  deletePrenotazione(id) {
    return this.database.executeSql('DELETE FROM prenotazioni WHERE id = ?', [id]).then(_ => {
      this.loadPrenotazioni();
    });
  }
}