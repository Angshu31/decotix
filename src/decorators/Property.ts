import { DateTime, Float } from "../db-types";
import { getTypeName } from "../lib/getTypeName";
import { PriorityLevels } from "../lib/PriorityLevels";
import { ReturnTypeFunc } from "../types/ReturnTypeFunc";
import { PropertyDecoratorWrapper } from "./PropertyDecorator";

export type PropertyOptions = { nullable?: boolean };

export function Property(returnTypeFunc?: ReturnTypeFunc): PropertyDecorator;
export function Property(options?: PropertyOptions): PropertyDecorator;
export function Property(
  returnTypeFunc?: ReturnTypeFunc,
  options?: PropertyOptions
): PropertyDecorator;

export function Property(...args: any[]): PropertyDecorator {
  let arg0 = args[0];
  let returnTypeFunc = typeof arg0 === "function" ? arg0 : null;
  let options: PropertyOptions = (returnTypeFunc ? args[1] : arg0) || {};

  return (target, propKey) => {
    const name = String(propKey);

    if (!returnTypeFunc) {
      returnTypeFunc = () => {
        const x = Reflect.getMetadata("design:type", target, propKey);

        if (x === Number) return Float;
        if (x === Date) return DateTime;

        if (!x || x === Object || x === Array) {
          throw new TypeError(
            `Could not get type for field "${name}" of model ${getTypeName(
              target.constructor
            )}`
          );
        }

        return x;
      };
    }

    PropertyDecoratorWrapper(
      target.constructor,
      PriorityLevels.initProperties,
      (data) => {
        data.properties.set(name, {
          name,
          type: getTypeName(returnTypeFunc()),
          attributes: [],
          nullable: options.nullable,
        });
      }
    );
  };
}
