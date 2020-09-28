import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Utenti';

  constructor(
    private firestore: AngularFirestore
  ) { }

  addUser(record) {
    return this.firestore.collection(this.collectionName).add(record);
	}

  getUsers() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
	}

	getUserByCellulare(cellulare){
		return this.firestore.collection(this.collectionName, ref => ref.where('cellulare', '==', cellulare)).snapshotChanges();
	}

	getUserByEmail(email){
		return this.firestore.collection(this.collectionName, ref => ref.where('email', '==', email)).snapshotChanges();
	}

  updateUser(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  deleteUser(recordID) {
    this.firestore.doc(this.collectionName + '/' + recordID).delete();
  }
}