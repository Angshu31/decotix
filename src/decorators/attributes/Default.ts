import { PriorityLevels } from "../../lib/PriorityLevels";
import { Attribute } from "./Attribute";

export type DefaultAttributeType =
  | "autoincrement"
  | "uuid"
  | "cuid"
  | "dbgenerated"
  | "now"
  | (string & {});

export const Default = (default_: DefaultAttributeType) => {
  return Attribute(PriorityLevels.afterProperties, () => ({
    name: "default",
    args: [
      default_ === "autoincrement" ||
      default_ === "uuid" ||
      default_ === "cuid" ||
      default_ === "dbgenerated" ||
      default_ === "now"
        ? `${default_}()`
        : default_,
    ],
    noArgEncode: true,
  }));
};
