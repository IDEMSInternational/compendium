import { Tag } from "./tag";

export class Person {
  id?: string;
  firstName?: string;
  lastName?: string;
  tags?: Tag["id"][]
}