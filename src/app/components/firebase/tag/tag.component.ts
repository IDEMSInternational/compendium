import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from 'src/app/core/services/person/person.service';
import { TagService } from 'src/app/core/services/tag/tag.service';
import { Person } from 'src/app/shared/models/person';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tagId: Tag["id"]
  @Input() personId: Person["id"]
  tag: Tag = new Tag
  editMode = false
  deleted = false

  constructor(private tagService: TagService) { }

  async ngOnInit() {
    if (this.tagId) {
      this.tag = await this.tagService.getTagFromId(this.tagId)
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  deleteTag() {
    if (this.tag.id) {
      this.tagService.delete(this.tag.id)
      this.toggleEditMode()
      this.deleted = true
    }
  }

  updateTag() {
    if (this.tag.id) {
      this.tagService.update(this.tag.id, this.tag)
      this.toggleEditMode()
    }
  }

  removeFromPerson(personId: string | undefined) {
    if (personId && this.tag.id) {
      this.tagService.unassignTag(personId, this.tag.id)
    }
  }
}
