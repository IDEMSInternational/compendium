import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, doc, DocumentData, collectionData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Person } from 'src/app/shared/models/person';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.peopleCollection = collection(this.firestore, "people")
  }

  logFirestoreObject() {
    console.log(this.firestore)
  }

  getAll() {
    return collectionData(this.peopleCollection) as Observable<Person[]>
  }

  async create(person: Person) {
    const docRef = await addDoc(this.peopleCollection, { ...person })
    const id = docRef.id
    updateDoc(docRef, {id, ...person})
    return docRef
  }

  update(id: string, data: Partial<Person>) {
    const docRef = doc(this.firestore, "people", id)
    return updateDoc(docRef, data)
  }

  delete(id: string) {
    const docRef = doc(this.firestore, "people", id)
    return deleteDoc(docRef)
  }
}
