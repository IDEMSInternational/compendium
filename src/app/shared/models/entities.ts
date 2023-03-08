/** E.g.
 * {
 *   id: 1,
 *   entityTypeId: 1,
 *   name: Chris
 * }
 * {
 *   id: 2,
 *   entityTypeId: 2,
 *   name: IoGT
 * }
 */
export type Entity = {
  id: string,
  entityTypeId: EntityType["id"],
  name?: string
}

/** E.g.
 * {
 *   id: 1,
 *   name: Staff,
 *   description: ...
 * }
 * {
 *   id: 2,
 *   name: Project,
 *   description: ...
 * }
 */
export type EntityType = {
  id: string,
  name: string,
  namePlural: string,
  description: string
}

/** E.g.
 * {
 *   id: 1,
 *   entityTypeId: 1
 *   field: First Name,
 *   type: string,
 *   description: ...,
 *   displayOrder: 1
 * }
 */
export type EntityFieldType = {
  id: string,
  entityTypeId: EntityType["id"],
  field: string,
  type: "string" | "number" | "etc",
  description: string,
  displayOrder: number
}

/** E.g. link "Staff" to "Project"
 * {
 *   entityTypeId: 1
 *   linkEntityTypeId: 2
 * }
 */
export type EntityLink = {
  entityTypeId: string,
  linkEntityTypeId: EntityType["id"],
}

/** E.g.
 * {
 *   entityId: 1,
 *   entityTypeId: 1,
 *   value: Chris
 * }
 * {
 *   entityId: 1,
 *   entityTypeId: 2,
 *   value: Marsh
 * }
 */
export type EntityFieldValue = {
  entityId: string,
  entityTypeId: EntityType["id"],
  value: string
}


// Do we need tags? Why not just use fields?
/** E.g.
 * {
 *   entityId: 1,
 *   entityTypeId:
 *   linkedId: 2
 *   linkedEntityTypeId:
 * }
 */
export type EntityTag = {
  entityId: string,
  entityTypeId: EntityType["id"],
  linkedId: string,
  linkedEntityTypeId: string
}
