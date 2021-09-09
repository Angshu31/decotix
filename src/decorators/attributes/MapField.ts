import { PriorityLevels } from "../../lib/PriorityLevels";
import { Attribute } from "./Attribute";

export const MapField = (field: string) =>
  Attribute(PriorityLevels.afterProperties, () => ({
    name: "map",
    args: [field],
  }));
