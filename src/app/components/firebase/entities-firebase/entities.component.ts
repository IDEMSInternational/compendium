import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable, map, filter, BehaviorSubject, switchMap } from 'rxjs';
import { EntityService } from 'src/app/core/services/entity-firebase/entity.service';
import { Entity, EntityType } from 'src/app/shared/models/entities';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  // entities$ = this.entityService.entities$;
  entityTypes$ = this.entityService.entityTypes$;
  activeEntityType$ = new BehaviorSubject<EntityType | undefined>(undefined)
  entities$ = this.activeEntityType$.pipe(
    switchMap((entityType) => this.entityService.getEntitiesOfType(entityType?.id))
  );

  constructor(private entityService: EntityService) {
  }

  async ngOnInit() {
    this.activeEntityType$.next((await firstValueFrom(this.entityTypes$))[0])
  }

  // applyFilter() {
  //   if (this.activeEntityType) this.entities$ = this.entityService.getEntitiesOfType(this.activeEntityType.id)
  // }
  // applyFilter(entityType: EntityType | undefined) {
  //   if (entityType) this.entities$ = this.entityService.getEntitiesOfType(entityType.id)
  // }
  applyFilter(entityType: EntityType | undefined) {
    this.activeEntityType$.next(entityType)
  }

  onSelectChange() {
    console.log(this.activeEntityType$)
  }

}
