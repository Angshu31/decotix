export const _registeredTypeKey = Symbol("__decotix_registed_type__");

export const registerType = (obj: any, typeName: string) => {
  Reflect.defineMetadata(_registeredTypeKey, typeName, obj);
};
