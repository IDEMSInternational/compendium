import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/core/services/tag/tag.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags$: Observable<Tag[]>;
  addingTag = false
  activeTag: Tag | null = null

  constructor(private tagService: TagService) {
    this.tags$ = this.tagService.getAll()
  }

  ngOnInit(): void {
  }

  toggleAddingTag() {
    this.addingTag = !this.addingTag
  }

  selectTag(tag: Tag) {
    this.activeTag = tag
  }

  deselectTag() {
    this.activeTag = null
  }

}
