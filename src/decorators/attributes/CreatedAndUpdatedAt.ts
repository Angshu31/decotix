import { PriorityLevels } from "../../lib/PriorityLevels";
import { Attribute } from "./Attribute";
import { CustomAttribute } from "./CustomAttribute";
import { Default } from "./Default";

export const CreatedAt = () => Default("now");
export const UpdatedAt = () => CustomAttribute("updatedAt");
