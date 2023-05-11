import { Database } from "./database.types";

export type Entity = Database["public"]["Tables"]["entity"]["Row"]
export type EntityType = Database["public"]["Tables"]["entity_type"]["Row"]

export interface Field {
  field: string | undefined, value: string | undefined
}
export interface EntityWithFields extends Entity {
  fields?: Field[]
}
export interface EntityWithFieldsAndTags extends EntityWithFields {
  tags?: Field[]
}
export interface EntityTypeIdToDisplayOrderMap {
  [id: number]: number
}
