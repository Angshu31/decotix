import { Id, Model, Property, Relation } from "..";
import User from "./User";

@Model()
export class Profile {
  @Property()
  @Id()
  id: string;

  @Relation()
  @Property(() => User)
  user: User;

  @Relation("x", true)
  @Property()
  x: User;
}
