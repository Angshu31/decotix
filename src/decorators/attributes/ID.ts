import { Default, DefaultAttributeType } from ".";
import { CustomAttribute } from "./CustomAttribute";

export const Id =
  (_default?: DefaultAttributeType): PropertyDecorator =>
  (a, b) => {
    CustomAttribute("id")(a, b);
    if (_default !== undefined) {
      Default(_default)(a, b);
    }
  };
