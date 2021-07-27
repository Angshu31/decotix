import { ID, Model, Property } from "..";
import User from "./User";

@Model()
export class Profile {
  @Property()
  @ID()
  id: string;

  @Property(() => User, { nullable: true })
  user?: User;

  @Property()
  username: string;
}
