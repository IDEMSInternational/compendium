import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, doc, DocumentData, collectionData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagsCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
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

  delete(id: string) {
    const docRef = doc(this.firestore, "tags", id)
    return deleteDoc(docRef)
  }
}
