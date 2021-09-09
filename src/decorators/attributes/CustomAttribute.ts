import { PriorityLevels } from "../../lib/PriorityLevels";
import { Attribute } from "./Attribute";

export const CustomAttribute = (name: string) =>
  Attribute(PriorityLevels.afterProperties, () => ({ name }));
