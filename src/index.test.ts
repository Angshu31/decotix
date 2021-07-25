import { Model, Property, Relation, ID } from ".";
import { modelToString } from "./lib/modelToString";

@Model()
class User {
  @Property()
  @ID()
  id: string;

  @Property({ nullable: true })
  age: number;

  @Relation({ fields: ["profileId"], references: ["id"] })
  @Property(() => Profile)
  profile: any;
}

@Model()
class Profile {
  @Property()
  @ID()
  id: string;

  @Property(() => User, { nullable: true })
  user?: User;

  @Property()
  username: string;
}

it("generates model string", () => {
  const str =
    modelToString(User, { autoInsertDefaultId: "autoincrement()" }) +
    "\n\n" +
    modelToString(Profile);

  console.log(str);

  expect(str).toBeTruthy();
});
