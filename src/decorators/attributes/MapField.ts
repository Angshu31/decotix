import { safeString } from "../../lib/safe-string";
import { Attribute } from "./Attribute";

type X = PropertyDecorator;

export const MapField = <
  T extends string,
  X = { [P in T]: any } & { [key: string]: any }
>(
  field: T
) => {
  const func = Attribute(`@map(${safeString(String(field))})`, {
    type: "map",
    field,
  });
  return (target: X, propKey: keyof X) => {
    return func(target, propKey as any);
  };
};
