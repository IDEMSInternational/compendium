import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { Entity } from 'src/app/shared/models/entity.types';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() entity: Entity | undefined;
  @Input() parentEntity: Entity | undefined;
  @Input() adding = false;
  @Input() removing = false;
  @Output() tagsChangedEvent = new EventEmitter()

  constructor(private entityService: EntityService) { }

  ngOnInit(): void {
  }

  handleClick() {
    if (this.adding) {
      this.addTagToEntity()
      this.tagsChangedEvent.emit()
    } else if (this.removing) {
      this.removeTagFromEntity()
      this.tagsChangedEvent.emit()
    } else {
      // TODO: "Go to" tag
      console.log("Go to tag")
    }
  }

  async addTagToEntity() {
    if (this.parentEntity && this.entity) {
      const { error } = await this.entityService.addTagToEntity(this.entity, this.parentEntity)
      if (error) {
        console.error(error)
      }
    }
  }

  async removeTagFromEntity() {
    if (this.parentEntity && this.entity) {
      const { error } = await this.entityService.removeTagFromEntity(this.entity.id, this.parentEntity.id)
      if (error) {
        console.error(error)
      }
    }
  }
}
