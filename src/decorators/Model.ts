import { registerType } from "../lib/registerType";
import { attachStringifier } from "../lib/stringifiers";
import { ModelStringifier } from "../lib/stringifiers/model";
import { ModelData } from "../types/ModelData";

export const _modelKey = Symbol("__decotix_model_key__");

export function Model(name?: string): ClassDecorator {
  return (target) => {
    const modelName = name || target.name;

    Reflect.defineMetadata(
      _modelKey,
      {
        name: modelName,
        blockAttributes: [],
        properties: new Map(),
      } as ModelData,
      target
    );

    registerType(target, modelName);
    attachStringifier(ModelStringifier, target);
  };
}
