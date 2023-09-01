import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';
import { EntityService } from 'src/app/core/services/entity/entity.service';
import { ActivatedRoute } from '@angular/router';
import { FieldService } from 'src/app/core/services/field/field.service';
import { Observable, Subscription } from 'rxjs';
import { FieldBase } from 'src/app/shared/dynamic-form/field-base';

@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent extends EntityComponent implements OnInit, OnDestroy {
  fields: FieldBase<any>[] | undefined;
  deleting: boolean = false;
  deleted: boolean = false;
  queryParamsSubscription: Subscription | undefined;

  constructor(entityService: EntityService, private route: ActivatedRoute, private fieldService: FieldService) {
    super(entityService);
  }

  override async ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(async params => {
      this.entityId = params["id"]
      await super.ngOnInit()
      this.fields = this.entityWithFields?.fields?.map((field) => {
        return this.fieldService.convertFieldToFormField(field)
      })
      this.editing = params["editing"]

      // Better to use entityService.getFields(id) that returns observable ? Then use like this:
      // this.fields$ = this.fieldService.getFields()
    }); 
  }

  async handlePayload(payload: any) {
    await this.entityService.updateEntityFields(this.entity!.id, payload)
    this.queryParamsSubscription?.unsubscribe()
    this.editing = false
    await this.ngOnInit()
  }

  toggleDeleting() {
    this.deleting = !this.deleting
  }

  async deleteEntity() {
    await this.entityService.deleteEntity(this.entity!.id)
    this.deleted = true
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe()
  }
}
