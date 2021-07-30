import { Model, Property } from "..";
import { ComposeID } from "../decorators/attributes/blocks/ComposeID";
// import { CompositeID } from "../decorators/attributes/blocks/CompositeID";
import { Profile } from "./Profile";

@Model()
// @CompositeID(["id", "id2"])
export default class User {
  @Property()
  @ComposeID()
  id: string;

  @Property()
  @ComposeID()
  id2: string;

  @Property(() => Profile, { nullable: true })
  profile?: Profile;
}
