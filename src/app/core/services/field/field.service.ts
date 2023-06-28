import { Injectable } from '@angular/core';

import { DropdownField } from '../../../shared/dynamic-form/field-dropdown';
import { FieldBase } from '../../../shared/dynamic-form/field-base';
import { TextboxField } from '../../../shared/dynamic-form/field-textbox';
import { of } from 'rxjs';
import { EntityFieldType } from 'src/app/shared/models/entities';
import { Field } from 'src/app/shared/models/entity.types';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  getDummyFields() {
    const fields: FieldBase<string>[] = [
      new DropdownField({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      }),

      new TextboxField({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxField({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(fields.sort((a, b) => a.order - b.order));
  }

  convertFieldToFormField(field: Field): FieldBase<any> {
    let formField = {} as FieldBase<string>
    const { field: name, value, displayOrder, id } = field

    // TODO: Handle different types
    // if (type === "string") {
    formField = new TextboxField({
      key: id, label: name, order: displayOrder, value
    })
    // }
    return formField
  }
}