import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, doc, DocumentData, collectionData, addDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { Person } from 'src/app/shared/models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.peopleCollection = collection(this.firestore, "people")
  }

  getAll() {
    return collectionData(this.peopleCollection) as Observable<Person[]>
  }

  async create(person: Person) {
    const docRef = await addDoc(this.peopleCollection, { ...person })
    const id = docRef.id
    updateDoc(docRef, { id, ...person })
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

  async getPeopleWithTag(tagId: string) {
    const people$ = collectionData(query(this.peopleCollection, where("tagIds", "array-contains", tagId))) as Observable<Person>
    return await firstValueFrom(people$) as Person[]
  }
}
