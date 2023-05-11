import { Component, OnInit, Input } from '@angular/core';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { Entity } from 'src/app/shared/models/entity.types';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() entity: Entity | undefined
  tags: Entity[] | undefined
  loading = false

  constructor(private entityService: EntityService) { }

  ngOnInit(): void {
    this.getTags(this.entity!)
  }

  async getTags(entity: Entity) {
    try {
      this.loading = true
      const { data: tags, error, status } = await this.entityService.getTagsForEntity(entity.id)
      if (error && status !== 406) {
        throw error
      }
      if (tags) {
        // Tag could be added in either direction, show check fir both, avoiding adding duplicates
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
    } catch(error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

}
