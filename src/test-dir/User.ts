import {
  Model,
  Property,
  Int,
  ComposeUnique,
  NativeType,
  CompoundUnique,
  ComposeID,
} from "..";
import { CompositeID } from "../decorators/attributes/blocks/CompositeID";
import { Profile } from "./Profile";

@Model("UsEr")
@CompoundUnique<User>(["s", "y"], "SomeName")
@CompositeID<User>(["id", "id2"])
export default class User {
  @Property()
  id: string;

  @Property(() => Int)
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
