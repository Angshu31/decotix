import { BuildSchemaOptions } from "../../types/BuildSchemaOptions";

export const _stringifier_key = Symbol("__stringifier_key__");

export type Stringifier = (data: {
  obj: any;
  allLoadedPromise: Promise<void>;
  options: BuildSchemaOptions;
}) => Promise<string>;

export const attachStringifier = (stringifier: Stringifier, obj: any) =>
  Reflect.defineMetadata(_stringifier_key, stringifier, obj);

export const getStringifier = (obj: any) =>
  Reflect.getMetadata(_stringifier_key, obj);
