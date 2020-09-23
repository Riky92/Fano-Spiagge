import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  updateUser(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  deleteUser(recordID) {
    this.firestore.doc(this.collectionName + '/' + recordID).delete();
  }
}