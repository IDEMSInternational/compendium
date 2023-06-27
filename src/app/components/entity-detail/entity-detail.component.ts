import { Component, OnInit } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent extends EntityComponent implements OnInit {

  constructor(entityService: EntityService, private route: ActivatedRoute) {
    super(entityService);
  }

  override async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.entityId = params['id']
      super.ngOnInit()
    });
  }
}
