import { Type } from "./type.model";

export interface Tag {
    id: number;
    type: Type; // Refers to the `type` model
    name: string;
  }