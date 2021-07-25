export const _modelKey = Symbol("prisma-model");

export const Model =
  (name?: string): ClassDecorator =>
  (target) => {
    Reflect.defineMetadata(_modelKey, name ?? target.name, target);
  };
