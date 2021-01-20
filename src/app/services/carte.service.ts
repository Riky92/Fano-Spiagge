import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class CarteService{

	collectionName = 'Carte';

  constructor(
    private firestore: AngularFirestore
  ) { }

  addCarta(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  getCarte() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
	}

	getCarteByUserName(email) {
		return this.firestore.collection(this.collectionName, ref => ref.where('user.email', '==', email)).snapshotChanges();
	}

	getCarteByUserCellulare(cellulare) {
		return this.firestore.collection(this.collectionName, ref => ref.where('user.cellulare', '==', cellulare)).snapshotChanges();
	}

  updateCarta(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  deleteCarta(recordID) {
    this.firestore.doc(this.collectionName + '/' + recordID).delete();
  }

}