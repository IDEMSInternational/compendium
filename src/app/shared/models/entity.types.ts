import { Database } from "./database.types";

export type Entity = Database["public"]["Tables"]["entity"]["Row"]

export interface Field {
  field: string | undefined, value: string | undefined
}
export interface EntityWithFields extends Entity {
  fields?: Field[]
}