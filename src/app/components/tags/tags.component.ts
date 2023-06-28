import { Component, OnInit, Input } from '@angular/core';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { Entity, EntityType } from 'src/app/shared/models/entity.types';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  private _entity: Entity | undefined;

  @Input() 
  public set entity(value: Entity | undefined) {
    if (value) {
      this._entity = value
      this.ngOnInit()
    }
  }

  public get entity(): Entity | undefined {
    return this._entity
  }

  tags: Entity[] | undefined;
  availableTags: Entity[] = [];
  loading = false;
  editing = false;
  availableLinkTypes: EntityType[] = []

  constructor(private entityService: EntityService) { }

  ngOnInit(): void {
    if (this.entity) {
      this.getTags(this.entity)
      this.getAvailableTags(this.entity)
    }
  }

  async getTags(entity: Entity) {
    try {
      this.loading = true
      const { data: tags, error, status } = await this.entityService.getTagsForEntity(entity.id)
      if (error && status !== 406) {
        throw error
      }
      if (tags) {
        // Tag could be added in either direction, show check for both, avoiding adding duplicates
        const tagsToAdd: Entity[] = []
        for (let tag of tags) {
          if (tag.entity_id === this.entity!.id) {
            const { data: entity } = await this.entityService.getEntityById(tag.linked_entity_id)
            if (entity) {
              tagsToAdd.push(entity)
            }
          }
          if (tag.linked_entity_id === this.entity!.id) {
            const { data: entity } = await this.entityService.getEntityById(tag.entity_id)
            if (entity) {
              if (tagsToAdd.indexOf(entity) === -1) {
                tagsToAdd.push(entity)
              }
            }
          }
        }
        this.tags = tagsToAdd
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async getAvailableTags(entity: Entity) {
    try {
      this.loading = true

      // Get links for entity type
      const { data: links, error, status } = await this.entityService.getLinksForEntityType(entity.entity_type_id!)
      if (error && status !== 406) {
        throw error
      }
      if (links) {
        // Link could be in either direction. Add all entity_types that are not equal to the original one
        const entityTypeIds = []
        for (let link of links) {
          const { entity_type_id, link_entity_type_id } = link
          if (entity_type_id != entity.entity_type_id) {
            entityTypeIds.push(entity_type_id)
          } else if (link_entity_type_id != entity.entity_type_id) {
            entityTypeIds.push(link_entity_type_id)
          }
        }

        for (let entityTypeId of entityTypeIds) {
          const { data: entityType } = await this.entityService.getEntityTypeById(entityTypeId)
          if (entityType) {
            this.availableLinkTypes.push(entityType)
          }
          const { data: entities } = await this.entityService.getEntitiesByType(entityTypeId)
          if (entities) {
            this.availableTags.push(...entities)
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  toggleEditing() {
    this.editing = !this.editing
  }

  filterTags(entities: Entity[], entityType: EntityType) {
    return this.filterByEntityType(this.removeExtantTags(entities), entityType)
  }

  filterByEntityType(entities: Entity[], entityType: EntityType) {
    return entities.filter(entity => entity.entity_type_id === entityType.id)
  }

  removeExtantTags(entities: Entity[]) {
    return entities.filter(entity => {
      return !this.tags?.some(tag => tag.id === entity.id)
    })
  }

  // Hack. TODO: convert tags to observable stream and refactor to reactively update lists automatically
  tagsChanged() {
    setTimeout(() => {
      this.getTags(this.entity!)
      this.getAvailableTags(this.entity!)
    }, 100)
  }
}
