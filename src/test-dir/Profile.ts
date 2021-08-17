import { Id, Model, Property, Relation } from "..";
import User from "./User";

@Model()
export class Profile {
  @Property()
  @Id()
  id: string;

  @Relation<User>(["id", "id2"])
  @Property(() => User)
  user: User;
}
