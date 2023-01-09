import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/core/services/tag/tag.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {
  tag: Tag = new Tag
  submitted = false

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
  }

  async saveTag() {
    const docRef = await this.tagService.create(this.tag)
    console.log("Added tag with ID:", docRef.id)
    this.submitted = true
  }

  newTag() {
    this.submitted = false
    this.tag = new Tag
  }

}
