import { Model, Property, Id, Relation } from "..";
import { MongoID } from "../decorators/MongoDB";
import { UserProfile } from "./Profile";

@Model({ isAbstract: true })
export class BaseA {
  @Property()
  y: string;
}

@Model({ isAbstract: true })
export class BaseB extends BaseA {
  @Property()
  x: string;
}

@Model("UsEr")
export class User extends BaseB {
  @Property(() => String)
  @MongoID()
  id: string;

  // @Field(() => UserProfile)
  @Property(() => UserProfile)
  @Relation("UserProfileRelation", true)
  profile: UserProfile;

  // @Field(() => [User])
  @Relation("UserFollowRelation", { references: ["id"] })
  @Property(() => [User])
  following: User[];

  // @Field(() => [User])
  @Relation("UserFollowRelation", { references: ["id"] })
  @Property(() => [User])
  followers: User[];
}
