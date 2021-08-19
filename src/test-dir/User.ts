import { Model, Property, Id, Relation } from "..";
import { MongoID } from "../decorators/MongoDB";
import { UserProfile } from "./Profile";

@Model()
// @ObjectType()
export class User {
  // @Field(() => ID)
  @Property(() => String)
  @MongoID()
  id: string;

  // @Field(() => UserProfile)
  @Property(() => UserProfile)
  @Relation("UserProfileRelation", {
    fields: ["profileId"],
    references: ["id"],
  })
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
