import { Model, Property, Id, Relation } from "..";
import { User } from "./User";

@Model()
// @ObjectType()
export class UserProfile {
  // @Field(() => ID)
  @Property()
  @Id("uuid")
  id: string;

  // @Field(() => User)
  @Relation("UserProfileRelation")
  @Property(() => User, { nullable: true })
  user: User;

  // @Field()
  @Property()
  avatarURL: string;
}
