import { Attribute } from "./Attribute";

export const MapField = (field: string) =>
  Attribute(1, () => ({ name: "map", args: [field] }));
