import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, doc, DocumentData, collectionData, addDoc, updateDoc, deleteDoc, query, where, getDoc, docData } from '@angular/fire/firestore';
import { Observable, firstValueFrom, map } from 'rxjs';
import { EntityType, EntityFieldType, EntityLink, Entity, EntityFieldValue } from 'src/app/shared/models/entities'

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  entityCollection: CollectionReference<DocumentData>
  entityTypesCollection: CollectionReference<DocumentData>;
  entities$: Observable<Entity[]>
  entityTypes$: Observable<EntityType[]>

  constructor(private firestore: Firestore) {
    this.entityCollection = collection(this.firestore, "entities")
    this.entityTypesCollection = collection(this.firestore, "entityTypes")

    this.entities$ = collectionData(this.entityCollection) as Observable<Entity[]>
    this.entityTypes$ = collectionData(this.entityTypesCollection) as Observable<EntityType[]>
  }

  getAllEntities() {
    return collectionData(this.entityCollection) as Observable<Entity[]>
  }

  getAllEntityTypes() {
    return collectionData(this.entityTypesCollection) as Observable<EntityType[]>
  }

  getEntitiesOfType(entityTypeId: string | undefined) {
    // const entities$ = collectionData(query(this.entityCollection, where("entityTypeId", "==", entityTypeId)), { idField: "id" })
    // return entities$.pipe(map((data) => data as Entity[]))

    if (!entityTypeId) return this.entities$
    return this.entities$.pipe(
      map((entities) => entities.filter((entity) => entity.entityTypeId === entityTypeId))
    )
  }

}
