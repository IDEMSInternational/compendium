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
  @Input() entityId: number | undefined;
  loading: boolean = false;
  entityWithFields: EntityWithFields | undefined;
  expanded = false;
  editing = false;

  constructor(protected entityService: EntityService) { }

  async ngOnInit() {
    if (this.entityId) {
      const { data: entity, error } = await this.entityService.getEntityById(this.entityId)
      if (entity) {
        this.entity = entity
      }
    }
    if (this.entity) {
      await this.getFields()
    }
  }

  async getFields() {
    try {
      this.entityWithFields = this.entity
      this.loading = true
      const { data } = await this.entityService.getFieldsForEntityType(this.entity!.entity_type_id!)
      if (data) {
        const fieldsWithValues = await Promise.all(data.map(async (fieldType) => {
          const { data, error } = await this.entityService.getValueForField(fieldType.id, this.entity!.id)
          let value
          if (data) {
            value = data[0]?.value
          }
          return {
            value,
            displayOrder: fieldType.display_order,
            id: fieldType.id,
            description: fieldType.description,
            field: fieldType.field
          } as Field
        }))
        this.entityWithFields!.fields = _.orderBy(fieldsWithValues, "displayOrder")

        // Assign a display field to be diplasyed as the entity's name
        const { data: displayFieldTypeData } = await this.entityService.getDisplayFieldTypeId(this.entity!.entity_type_id!)
        const displayFieldTypeId = displayFieldTypeData?.display_field_type_id
        this.entityWithFields!.displayField = displayFieldTypeId
          ? this.entityWithFields?.fields.find((field) => field.id === displayFieldTypeId)
          : this.entityWithFields?.fields[0]
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  toggleExpanded() {
    this.expanded = !this.expanded
  }

  toggleEditing() {
    this.editing = !this.editing
  }
}
