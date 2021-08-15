import { Model, Property, Int, ComposeUnique, NativeType } from "..";
import { Profile } from "./Profile";

@Model("TheUserModel")
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

  @NativeType("Bit")
  @Property()
  s: string;

  @Property(() => Profile, { nullable: true })
  profile?: Profile;
}
