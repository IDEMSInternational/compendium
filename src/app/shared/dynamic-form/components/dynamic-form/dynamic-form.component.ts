import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../../field-base';
import { FieldControlService } from '../../field-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FieldControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() fields: FieldBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  @Output() newPayloadEvent = new EventEmitter<any>()

  constructor(private qcs: FieldControlService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.fields as FieldBase<string>[]);
  }

  onSubmit() {
    this.payLoad = this.form.getRawValue();
    this.newPayloadEvent.emit(this.payLoad)
  }
}