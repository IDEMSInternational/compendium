import { Component, OnInit, Input } from '@angular/core';
import { Entity } from 'src/app/shared/models/entity.types';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() entity: Entity | undefined
  constructor() { }

  ngOnInit(): void {
  }

  getTagsForEntity() {
    
  }

}
