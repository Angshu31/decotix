import { ID, Model, Property, Relation } from "..";
import User from "./User";

@Model()
export class Profile {
  @Property()
  @ID()
  id: string;

  @Relation({ fields: ["userId1", "userId2"], references: ["id", "id2"] })
  @Property(() => User)
  user: User;
}
