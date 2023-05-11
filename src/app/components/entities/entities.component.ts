import { Component, OnInit } from '@angular/core';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { Entity, EntityType, EntityTypeIdToDisplayOrderMap } from 'src/app/shared/models/entity.types';
import * as _ from "lodash"

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  loading: boolean = false
  entities: Entity[] | undefined
  fields: any
  entityTypeIdToDisplayOrderMap: EntityTypeIdToDisplayOrderMap = {}
  entityTypes: EntityType[] | undefined;

  constructor(private entityService: EntityService) {
  }

  async ngOnInit() {
    await this.getEntityTypeIdToDisplayOrderMap()
    await this.getEntities()
    await this.getEntityTypes()
  }

  async getEntities() {
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
  }

  async getEntityTypes() {
    try {
      this.loading = true
      const { data: entityTypes, error, status } = await this.entityService.getEntityTypes()
      if (error && status !== 406) {
        throw error
      }
      if (entityTypes) {
        this.entityTypes = _.orderBy(entityTypes, "display_order")
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  filterEntitiesByType(entities: Entity[] | undefined, entityType: EntityType) {
    if (!entities || !entityType) return []
    console.log("entities:", entities)
    console.log("entityType:", entityType)
    return entities.filter((entity) => entity.entity_type_id === entityType.id)
  }

  async getEntityTypeIdToDisplayOrderMap() {
    try {
      this.loading = true
      const { data: entityTypes, error, status } = await this.entityService.getEntityTypes()

      if (error && status !== 406) {
        throw error
      }

      if (entityTypes) {
        entityTypes.forEach((entityType) => {
          this.entityTypeIdToDisplayOrderMap[entityType.id] = entityType.display_order || Infinity
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  orderEntitiesByEntityType() {
    if (this.entities && Object.keys(this.entityTypeIdToDisplayOrderMap).length) {
      this.entities.sort((a, b) => {
        return (this.entityTypeIdToDisplayOrderMap[a.entity_type_id || 0] > this.entityTypeIdToDisplayOrderMap[b.entity_type_id || 0]) ? 1 : -1
      })
    }
  }
}
