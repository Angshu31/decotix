import {
  DateTime,
  Default,
  Id,
  Model,
  Property,
  Relation,
  Unique,
  UpdatedAt,
} from "..";
import { User } from "./User";

@Model()
// @ObjectType()
export class TokenPair {
  // @Field(() => ID)
  @Property()
  @Id("uuid")
  id: string;

  // @Field()
  @Property()
  @Unique()
  accessToken: string;

  // @Field()
  @Property()
  @Unique()
  refreshToken: string;

  // @Field(() => User)
  @Property()
  @Relation<User>(["id"])
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
