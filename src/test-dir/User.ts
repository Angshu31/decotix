import { ID, Model, Property, Relation } from "..";
import { CompositeID } from "../decorators/attributes/blocks/CompositeID";
import { FavFood } from "./FavFood";
import { Profile } from "./Profile";

@Model()
@CompositeID(["id", "id2"])
export default class User {
  @Property()
  id: string;

  @Property()
  id2: string;

  @Property({ nullable: true })
  age: number;

  @Relation({ fields: ["profileId"], references: ["id"] })
  @Property(() => Profile)
  profile: Profile;

  @Property(() => FavFood)
  favFood: FavFood;
}
