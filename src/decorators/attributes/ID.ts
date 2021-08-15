import { Attribute } from "./Attribute";
import { Default, DefaultAttributeType } from "./Default";

export const ID =
  (default_?: DefaultAttributeType): PropertyDecorator =>
  (a, b) => {
    Attribute("@id", { type: "id" })(a, b);

    if (default_ != null) {
      Default(default_)(a, b);
    }
  };
