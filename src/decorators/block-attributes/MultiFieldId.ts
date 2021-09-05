import { PropertyDecoratorWrapper } from "../PropertyDecorator";

export const MultiFieldId =
  <T extends string>(fields: T[]) =>
  (target: { new (...args: any[]): { [P in T]: any } }) => {
    PropertyDecoratorWrapper(target, 1, (data) => {
      data.blockAttributes.push({
        name: "id",
        fields,
      });
    });
  };
