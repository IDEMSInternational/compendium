import { Tag } from "./tag";

export class Person {
  id?: string;
  firstName?: string;
  lastName?: string;
  tagIds?: Tag["id"][];
}