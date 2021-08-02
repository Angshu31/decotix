import { Model, Property, Int, ComposeUnique } from "..";
import { Profile } from "./Profile";

@Model()
export default class User {
  @Property()
  @ComposeUnique()
  id: string;

  @Property()
  @ComposeUnique()
  id2: string;

  @ComposeUnique("algebra")
  @Property(() => Int)
  x: number;

  @ComposeUnique("algebra")
  @Property(() => Int)
  y: number;

  @Property(() => Profile, { nullable: true })
  profile?: Profile;
}
