import { Attribute } from "./Attribute";
import { Default } from "./Default";

export const CreatedAt = () => Default("now");
export const UpdatedAt = () => Attribute(1, () => ({ name: "updatedAt" }));
