import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from 'src/app/shared/models/type.model';
import { EntityTypeService } from 'src/app/core/services/entity-type.service';

@Component({
  selector: 'app-entity-types',
  templateUrl: './entity-types.component.html',
  styleUrls: ['./entity-types.component.scss']
})
export class EntityTypesComponent implements OnInit {
  public entityTypes?: Type[] | null= [];

  constructor(private entityTypeService: EntityTypeService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEntityTypes();
  }

  async fetchEntityTypes() {
    try {
      this.entityTypes = await this.entityTypeService.selectAllEntityTypes();
    } catch (error) {
      console.error('Error fetching entity types:', error);
      // You can also display a user-friendly message or handle the error differently as per your requirements.
    }
  }

  onButtonClick(id: number): void {
    this.router.navigate(['/entites', id]);
  }
}
