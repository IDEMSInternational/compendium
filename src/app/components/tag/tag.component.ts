import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/shared/models/entity.types';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() entity: Entity | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
