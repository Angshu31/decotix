import { Model, Property, Int, ComposeUnique, NativeType } from "..";
import { MapField } from "../decorators/attributes/MapField";
import { Profile } from "./Profile";

@Model("TheUserModel")
export default class User {
  @Property()
  @ComposeUnique()
  id: string;

  @Property(() => Int)
  @ComposeUnique()
  id2: number;

  @ComposeUnique("algebra")
  @Property(() => Int)
  x: number;

  @ComposeUnique("algebra")
  @Property(() => Int)
  y: number;

  @NativeType("Text")
  @Property()
  s: string;

  @Property(() => Profile, { nullable: true })
  profile?: Profile;
}
