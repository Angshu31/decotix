import {
  DateTime,
  Default,
  Id,
  Model,
  Property,
  Relation,
  UpdatedAt,
} from "..";
import { User } from "./User";

@Model()
// @ObjectType()
export class OauthConnection {
  // @Field(() => ID)
  @Property()
  @Id("uuid")
  id: string;

  // @Field()
  @Property()
  email: string;

  // @Field(() => OauthConnectionService)

  // @Field()
  @Property()
  oauthServiceUserId: string;

  // @Field()
  @Property()
  isPrimary: boolean;

  @Relation()
  @Property(() => User)
  user: User;

  // @Field(() => Date)
  @Property(() => DateTime)
  @Default("now")
  createdAt: Date;

  // @Field(() => Date)
  @Property(() => DateTime)
  @UpdatedAt()
  updatedAt: Date;
}
