import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prenotazione } from '../model/prenotazione';
import { PrenotazioniService } from '../services/prenotazioni2.service';
import { of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniProvider implements OnDestroy{

	prenotazioni = new BehaviorSubject([]);

	prenotazioniList;

	subscription;

	constructor(
		private prenotazioniService: PrenotazioniService
	){
		this.loadPrenotazioni();
	}

	loadPrenotazioni(){
		this.subscription = this.prenotazioniService.getPrenotazioni().subscribe( response => {
			const prenotazioniData : Prenotazione[] = response.map(e => {
        return {
					id: e.payload.doc.id,
          codSpiaggia: e.payload.doc.data()['codSpiaggia'],
          descSpiaggia: e.payload.doc.data()['descSpiaggia'],
          ombrellone: e.payload.doc.data()['ombrellone'],
					dataPrenotazione: e.payload.doc.data()['dataPrenotazione'],
					nlettini: e.payload.doc.data()['nlettini'],
					nsdraie: e.payload.doc.data()['nsdraie'],
					prezzo: e.payload.doc.data()['prezzo'],
					user: e.payload.doc.data()['user'],
				};
			});
			this.prenotazioni.next(prenotazioniData);
		});
	}

	getPrenotazioni(): Observable<Prenotazione[]> {
    return this.prenotazioni.asObservable();
	}

	getPrenotazioniList(){
		return this.prenotazioniList;
	}

	getPrenotazioniBySpiaggiaDate(spiaggia, data){
		this.prenotazioni.subscribe( response => {
			const prenotazioneList: Prenotazione[] =
			response.filter( prenotazione => prenotazione.codSpiaggia === spiaggia && prenotazione.dataPrenotazione === data);
			return of(prenotazioneList);
		});
	}

	getOmbrelloneByPrenotazioneDate(){

	}

	addPrenotazione(prenotazione){
		this.prenotazioniService.addPrenotazione(prenotazione);
	}

	updatePrenotazione(prenotazione) {
    const record = {};
    record['codSpiaggia'] = prenotazione.codSpiaggia;
    record['descSpiaggia'] = prenotazione.descSpiaggia;
		record['ombrellone'] = prenotazione.ombrellone;
		record['dataPrenotazione'] = prenotazione.dataPrenotazione;
		record['nlettini'] = prenotazione.nlettini;
		record['nsdraie'] = prenotazione.nsdraie;
		record['prezzo'] = prenotazione.prezzo;
		record['user'] = prenotazione.user;
    this.prenotazioniService.updatePrenotazione(prenotazione.id, record);
	}

	removePrenoazione(id) {
    this.prenotazioniService.deletePrenotazione(id)
	}

	ngOnDestroy(){
		this.prenotazioni.unsubscribe();
	}
}
