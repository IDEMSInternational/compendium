export class FieldBase<T> {
  // The value of the field
  value: T|undefined;
  // The name/id of the field
  key: string | number;
  // The displayed name of the field
  label: string;
  // Whether or not the field is required
  required: boolean;
  // The order in which to display the fields
  order: number;
  // Currently supported: textbox. TODO: dropdown
  controlType: string;
  // The type of the value, e.g. string, enum
  type: string;
  // If enum, the available options
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string | number;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
