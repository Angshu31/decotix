import { Attribute } from "./Attribute";

export const MapField = (field: string): PropertyDecorator => {
  const func = Attribute(`@map("${String(field)}")`, {
    type: "map",
    field,
  });
  return (target, propKey) => {
    return func(target, propKey as any);
  };
};
