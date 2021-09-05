import { Attribute } from "./Attribute";

export const CustomAttribute = (name: string) => Attribute(1, () => ({ name }));
