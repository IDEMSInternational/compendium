import { Component, Input, OnInit } from '@angular/core';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { Entity, EntityWithFields, Field } from 'src/app/shared/models/entity.types';
import * as _ from "lodash" 

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  @Input() entity: Entity | EntityWithFields | undefined;
  loading: boolean = false;
  entityWithFields: EntityWithFields | undefined;
  expanded = false;
  editing= false;

  constructor(private entityService: EntityService) { }

  async ngOnInit() {
    if (this.entity) {
      this.entityWithFields = this.entity
      try {
        this.loading = true
        const { data, error, status } = await this.getFields(this.entity.id)
        if (error && status !== 406) {
          throw error
        }

        interface ReturnObject {
          value?: string,
          entity_field_type?: {
            field: string,
            display_order?: number
          },
        }
        if (data) {
          const fields = data.map((returnObject) => {
            const returned = returnObject as ReturnObject
            return {
              field: returned.entity_field_type?.field,
              value: returned.value,
              displayOrder: returned.entity_field_type?.display_order
            }
          })
          fields.sort((a, b) => (a.displayOrder! > b.displayOrder!) ? 1 : -1)
          this.entityWithFields.fields = _.orderBy(fields, "displayOrder")
        }
      } catch(error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        this.loading = false
      }
    }
  }

  async getFields(entityId: number) {
    return await this.entityService.getFieldsForEntity(entityId)
  }

  toggleExpanded() {
    this.expanded = !this.expanded
  }
 
  toggleEditing() {
    this.editing = !this.editing
  }
}
