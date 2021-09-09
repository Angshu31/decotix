import { PropertyDecoratorWrapper } from "../PropertyDecorator";
import { Attribute } from "./Attribute";
import { CustomAttribute } from "./CustomAttribute";

export const Id = () => CustomAttribute("id");
