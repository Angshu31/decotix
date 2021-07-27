import { ID, Model, Property, Relation } from "..";
import { FavFood } from "./FavFood";
import { Profile } from "./Profile";

@Model()
export default class User {
  @Property()
  @ID()
  id: string;

  @Property({ nullable: true })
  age: number;

  @Relation({ fields: ["profileId"], references: ["id"] })
  @Property(() => Profile)
  profile: Profile;

  @Property(() => FavFood)
  favFood: FavFood;
}
