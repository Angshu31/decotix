import { PropertyDecoratorWrapper } from "../PropertyDecorator";
import { Attribute } from "./Attribute";

export type DefaultAttributeType =
  | "autoincrement"
  | "uuid"
  | "cuid"
  | "dbgenerated"
  | "now"
  | (string & {});

export const Default = (default_: DefaultAttributeType) =>
  Attribute(1, () => ({
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
  }));
