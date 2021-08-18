import { Attribute } from "./attributes/Attribute";
import { Default } from "./attributes/Default";
import { Id } from "./attributes/Id";
import { MapField } from "./attributes/MapField";

/**
 * Defines an ObjectID
 * ***Only supported in MongoDB***
 */
export const ObjectID = () => Attribute("@db.ObjectId");

/**
 * Defines an id for MongoDB
 */
export const MongoID = (): PropertyDecorator => (t, p) => {
  Id()(t, p);
  Default("dbgenerated")(t, p);
  MapField("_id")(t, p);
  ObjectID()(t, p);
};
