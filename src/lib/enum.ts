import { applySignature, _Signature } from "./signatures";

type EnumSignatureData = { name: string };

/**
 * Note: Even if calling `registerEnums` on your enums, please make sure that you
 * export them and load them onto `buildSchema`'s `input` option (directly or via a glob path)
 *
 * @example
 * ```
 * // FavFoood.ts
 * import { registerEnums } from "../lib/enum";
 *
 * export enum FavFood {
 *   banana = "banana",
 *   apple = "banana",
 * }
 *
 * registerEnums({ FavFood });
 * ```
 */
export const registerEnums = (map: { [name: string]: any }) =>
  Object.entries(map).forEach(([name, theEnum]) =>
    applySignature(theEnum, "enum", { name } as EnumSignatureData)
  );

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

  applySignature(_enum, "enum", { name } as EnumSignatureData);
  return _enum;
}

export type EnumValues<T extends { [key: string]: string }> = T[keyof T];

export const enumToString = (theEnum: any, sig: _Signature) => {
  const extraData = sig.extraData as EnumSignatureData;

  // Cut out numeric values (from numeric enums)
  const keys = Object.values(theEnum).filter((x) => typeof x === "string");

  return `enum ${extraData.name} {\n${keys.join("\n")}\n}`;
};
