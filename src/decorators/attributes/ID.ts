import { PropertyDecoratorWrapper } from "../PropertyDecorator";
import { Attribute } from "./Attribute";

export const Id = (): PropertyDecorator =>
  Attribute(1, () => ({
    name: "id",
  }));
