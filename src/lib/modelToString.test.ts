import { Model, Property, Id, Relation } from "..";
import { Unsupported } from "../field-types";
import { modelToString } from "./modelToString";

@Model()
class MyModelA {
  @Property()
  @Id("uuid")
  id: string;

  @Relation<MyModelB>(["id"])
  @Property(() => MyModelB)
  b1: any;

  @Relation<MyModelA, MyModelB>({ fields: ["b2_id"], references: ["id"] })
  @Property(() => MyModelB)
  b2: any;

  @Property(() => Unsupported("circle"))
  someUnsupportedField: any;
}

@Model()
class MyModelB {
  @Property()
  @Id("uuid")
  id: string;

  @Property(() => MyModelA)
  a: any;
}

it("generates model string", () => {
  const str = modelToString(MyModelA);
  expect(str.split("\n").map((x) => x.trim().replace(/\s+/g, " "))).toEqual([
    "model MyModelA {",
    "id String @id @default(uuid())",
    "b1 MyModelB @relation(fields: [b1Id], references: [id])",
    "b1Id String",
    "b2 MyModelB @relation(fields: [b2_id], references: [id])",
    "b2_id String",
    'someUnsupportedField Unsupported("circle")',
    "}",
  ]);
});
