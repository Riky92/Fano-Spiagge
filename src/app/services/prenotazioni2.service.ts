import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  collectionName = 'Prenotazioni';

  constructor(
    private firestore: AngularFirestore
  ) { }

  addPrenotazione(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  getPrenotazioni() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  updatePrenotazione(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  deletePrenotazione(recordID) {
    this.firestore.doc(this.collectionName + '/' + recordID).delete();
  }
}