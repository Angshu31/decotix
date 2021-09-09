import { attachStringifier, Stringifier } from ".";
import { registerType } from "../registerType";

export const _enumKey = Symbol("__decotix_enum_key__");

export function createEnum<X extends string, T extends { [key: string]: X }>(
  name: string,
  theEnum: T
): T;
export function createEnum<X extends string>(
  name: string,
  theEnum: X[]
): { [P in X]: P };
export function createEnum(...args: any[]) {
  const [name, theEnum] = args as [string, any];
  let _enum = theEnum;

  if (Array.isArray(theEnum)) {
    _enum = {};

    for (const key of theEnum) {
      _enum[key] = key;
    }
  }

  if (typeof name !== "string")
    throw new TypeError(`Enum got a non-string name: ${name}`);

  Reflect.defineMetadata(_enumKey, name, _enum);

  registerType(_enum, name);
  attachStringifier(EnumStringifier, _enum);

  return _enum;
}

export const EnumStringifier: Stringifier = async ({ obj: theEnum }) => {
  const name = Reflect.getMetadata(_enumKey, theEnum);

  // Cut out numeric values (from numeric enums)
  const keys = Object.values(theEnum).filter((x) => typeof x === "string");

  return `enum ${name} {\n${keys.join("\n")}\n}`;
};

export type ValuesOf<T extends { [key: string]: string }> = T[keyof T];
