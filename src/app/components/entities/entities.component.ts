import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable, map, filter } from 'rxjs';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { Entity, EntityType } from 'src/app/shared/models/entities';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  entities$ = this.entityService.entities$;
  entityTypes$ = this.entityService.entityTypes$;
  activeEntityType: EntityType | undefined

  constructor(private entityService: EntityService) {
  }

  async ngOnInit() {
    this.activeEntityType = (await firstValueFrom(this.entityTypes$))[0]
  }

  applyFilter() {
    if (this.activeEntityType) this.entities$ = this.entityService.getEntitiesOfType(this.activeEntityType.id)
  }

  onSelectChange() {
    console.log(this.activeEntityType)
  }

}
