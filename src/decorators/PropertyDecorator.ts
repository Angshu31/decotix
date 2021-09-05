import { ModelData } from "../types/ModelData";

export const _effects_key = Symbol("__decotix_effects__");

type Effect = (data: ModelData) => void;

export const PropertyDecoratorWrapper = (
  Target: Function,
  priority: number,
  effect: Effect
) => {
  let effects: Effect[][] = Reflect.getMetadata(_effects_key, Target);

  if (!effects) {
    effects = [];
    Reflect.defineMetadata(_effects_key, effects, Target);
  }

  (effects[priority] || (effects[priority] = [])).push(effect);
};
