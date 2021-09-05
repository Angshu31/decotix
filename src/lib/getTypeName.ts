import { _registeredTypeKey } from "./registerType";

export const getTypeName = (obj: Function | object): string => {
  let name = "";

  try {
    name = Reflect.getMetadata(_registeredTypeKey, obj);
  } catch (e) {}

  if (!name || typeof name !== "string") {
    throw new TypeError(
      `${
        typeof obj === "function" ? `[Function: ${obj.name}]` : obj
      } is not a valid type, model, enum, datasource or generator.`
    );
  }

  return name;
};
