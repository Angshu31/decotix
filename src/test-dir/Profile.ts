import { ID, Model, Property, Relation } from "..";
import User from "./User";

@Model()
export class Profile {
  @Property()
  @ID()
  id: string;

  @Relation<User>(["id", "id2"])
  @Property(() => User)
  user: User;
}
