import { FieldBase } from './field-base';

export class TextboxField extends FieldBase<string> {
  override controlType = 'textbox';
}