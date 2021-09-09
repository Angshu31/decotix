export const _stringifier_key = Symbol("__stringifier_key__");

export const attachStringifier = (
  stringifier: (data: any, allLoaded: Promise<void>) => Promise<string>,
  obj: any
) => Reflect.defineMetadata(_stringifier_key, stringifier, obj);

export const getStringifier = (obj: any) =>
  Reflect.getMetadata(_stringifier_key, obj);
