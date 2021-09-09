import { PriorityLevels } from "../../../lib/PriorityLevels";
import { Attribute } from "../Attribute";

export function Relation(...args: any[]): PropertyDecorator {
  return Attribute(PriorityLevels.relation, () => ({ name: "relation", args }));
}
