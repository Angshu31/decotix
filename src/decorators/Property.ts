import { Float } from "../db-types";

export const _propKey = Symbol("prisma-model-props");

export type PropertyOptions = { nullable?: boolean };

export type _PropertyMetadata = {
  name: string;
  nullable: boolean;
  getType: () => Function;
};

export function Property(): PropertyDecorator;
export function Property(getType: () => Function): PropertyDecorator;
export function Property(options: PropertyOptions): PropertyDecorator;
export function Property(
  getType: () => Function,
  options: PropertyOptions
): PropertyDecorator;
export function Property(...args: any[]) {
  return (target, name) => {
    const getType =
      typeof args[0] === "function"
        ? args[0]
        : () => {
            const x = Reflect.getMetadata("design:type", target, name);
            if (x === Number) return Float;
            return x;
          };

    const { nullable = false }: PropertyOptions =
      typeof args[0] === "object" ? args[0] : args[1] ?? {};

    Reflect.defineMetadata(
      _propKey,
      [
        ...(Reflect.getMetadata(_propKey, target) || []),
        { name: String(name), nullable, getType },
      ],
      target
    );
  };
}
