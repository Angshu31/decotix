import { PropertyAttributeData } from "../../types/ModelData";
import { PropertyDecoratorWrapper } from "../PropertyDecorator";

export const Attribute = (
  priority: number,
  func: (obj: {
    propKey: string | symbol;
    target: any;
    propName: string;
  }) => PropertyAttributeData
): PropertyDecorator => {
  return (target, propKey) => {
    PropertyDecoratorWrapper(target.constructor, priority, (data) => {
      const propName = String(propKey);
      const property = data.properties.get(propName);

      if (!property)
        throw new Error(
          `You are trying to put an attribute on a non-existent property (${propName} in ${data.name})`
        );

      property.attributes.push(func({ propKey, target, propName }));
    });
  };
};
