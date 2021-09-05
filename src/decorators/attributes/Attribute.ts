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
      data.properties
        .get(propName)
        .attributes.push(func({ propKey, target, propName }));
    });
  };
};
