import { _registeredTypeKey } from "./registerType";

export const getTypeName = (obj: Function | object): string => {
  if (Array.isArray(obj)) return getTypeName(obj[0]) + "[]";

  let name = "";

  try {
    name = Reflect.getMetadata(_registeredTypeKey, obj);
  } catch (e) {}

  if (!name || typeof name !== "string") {
    throw new TypeError(
      `${
        typeof obj === "function" ? `[Function: ${obj.name}]` : obj
      } is not a valid type, model or enum.`
    );
  }

  return name;
};
