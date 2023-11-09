import { Field } from "./field.model";
import { Tag } from "./tag.model";
import { Type } from "./type.model";

export interface Entity {
    id: number;
    type: Type; // Refers to the `type` model
    name: string;
    fields: Field[]; // Array of `field` model
    tags: Tag[]; // Array of `tag` model
  }
  