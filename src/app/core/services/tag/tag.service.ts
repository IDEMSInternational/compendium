import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, doc, DocumentData, collectionData, addDoc, updateDoc, deleteDoc, getDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonService } from '../person/person.service';
import { Tag } from 'src/app/shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagsCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private personService: PersonService) {
    this.tagsCollection = collection(this.firestore, "tags")
  }

  getAll() {
    return collectionData(this.tagsCollection) as Observable<Tag[]>
  }

  async create(tag: Tag) {
    const docRef = await addDoc(this.tagsCollection, { ...tag })
    const id = docRef.id
    updateDoc(docRef, {id, ...tag})
    return docRef
  }

  update(id: string, data: Partial<Tag>) {
    const docRef = doc(this.firestore, "tags", id)
    return updateDoc(docRef, data)
  }

  async delete(tagId: string) {
    // First remove tag reference from people it is assigned to
    const peopleWithTag = await this.personService.getPeopleWithTag(tagId)
    for (let person of peopleWithTag) {
      this.unassignTag(person.id!, tagId)
    }
    // Then delete tag
    const docRef = doc(this.firestore, "tags", tagId)
    return deleteDoc(docRef)
  }

  async getTagFromId(id: string) {
    const docRef = doc(this.firestore, "tags", id)
    console.log("docRef:", docRef)
    const docSnapshot = await getDoc(docRef)
    console.log("docSnapshot:", docSnapshot)
    return docSnapshot.data() as Tag
  }

  assignTag(personId: string, tagId: string) {
    const personRef = doc(this.firestore, "people", personId)
    updateDoc(personRef, {
      tagIds: arrayUnion(tagId)
    })
  }

  async unassignTag(personId: string, tagId: string) {
    const personRef = doc(this.firestore, "people", personId)
    updateDoc(personRef, {
      tagIds: arrayRemove(tagId)
    })
  }
}
