import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, DocumentData, collectionData } from '@angular/fire/firestore';
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
}
