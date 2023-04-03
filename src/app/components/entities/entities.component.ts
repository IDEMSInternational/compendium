import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable, map, filter, BehaviorSubject, switchMap } from 'rxjs';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { Entity } from 'src/app/shared/models/entity.types';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  loading: boolean = false
  entities: Entity[] | undefined
  fields: any
  entitiesWithFields: any;

  constructor(private entityService: EntityService) {
  }

  async ngOnInit() {
    try {
      this.loading = true
      const { data: entities, error, status } = await this.entityService.getEntities()
  
      if (error && status !== 406) {
        throw error
      }
  
      if (entities) {
        this.entities = entities
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }  

    this.entitiesWithFields = await Promise.all(this.entities!.map(entity => this.getFieldsForEntity(entity.id)))
  }

  async getFieldsForEntity(entityId: number) {
    const fields = await this.entityService.getFieldsForEntity(entityId)
    return fields
  }

}
