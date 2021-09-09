import { Attribute } from "./Attribute";
import { CustomAttribute } from "./CustomAttribute";
import { Default } from "./Default";
import { Id } from "./Id";
import { MapField } from "./MapField";

export const ObjectId = () => CustomAttribute("db.ObjectId");

export const MongoId = (): PropertyDecorator => (t, p) => {
  Id()(t, p);
  Default("dbgenerated")(t, p);
  MapField("_id")(t, p);
  ObjectId()(t, p);
};
