import { Component, Input, OnInit } from '@angular/core';
import { TagService } from 'src/app/core/services/tag/tag.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: Tag = new Tag
  editMode = false
  deleted = false

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
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

}
