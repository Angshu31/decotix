import { Model, Property, Int, ComposeUnique, CompoundUnique, Id } from "..";
import { Profile } from "./Profile";

@Model("UsEr")
@CompoundUnique<User>(["s", "y"], "SomeName")
export default class User {
  @Property()
  @Id()
  id: string;

  @Property(() => Int)
  id2: number;

  @ComposeUnique("algebra")
  @Property(() => Int)
  x: number;

  @ComposeUnique("algebra")
  @Property(() => Int)
  y: number;

  @Property(() => [String])
  s: string[];

  @Property(() => Profile, { nullable: true })
  profile?: Profile;
}
