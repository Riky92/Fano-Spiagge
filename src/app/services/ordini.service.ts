import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdiniService {

  collectionName = 'Ordini';

  constructor(
    private firestore: AngularFirestore
  ) { }

  addOrdine(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  getOrdini() {
    return this.firestore.collection(this.collectionName , ref => ref.orderBy('timestamp','desc').limit(10)).snapshotChanges();
	}

	getOrdiniByUserEmail(email) {
		return this.firestore.collection(this.collectionName, ref => ref.where('user.email', '==', email)).snapshotChanges();
	}

	getOrdiniByUserCellulare(cellulare) {
		return this.firestore.collection(this.collectionName, ref => ref.where('user.cellulare', '==', cellulare)).snapshotChanges();
	}

  updateOrdine(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  deleteOrdine(recordID) {
    this.firestore.doc(this.collectionName + '/' + recordID).delete();
  }
}