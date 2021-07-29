import { Attribute } from "./Attribute";

export type DefaultAttributeType =
  | "autoincrement"
  | "uuid"
  | (string & { zz_ignore_me__?: never })
  | (any & { zz_ignore_me___?: never });

/**
 * The `@default()` attribute
 *
 * Adds a default value/function for a property in a model
 *
 * NOTE: `()` is not always appended to your value by default. Only `autoincrement` and `uuid` are changed to `autoincrement()` and `uuid()`.
 * ***This means that `someOtherPrismaFunction` will not be converted to `someOtherPrismaFunction()` automatically***
 */
export function Default(default_: DefaultAttributeType) {
  return Attribute(
    `@default(${
      // Autoinsert `()` for autoincrement and uuid
      default_ === "autoincrement" || default_ === "uuid"
        ? `${default_}()`
        : default_
    })`,
    { type: "default" }
  );
}
