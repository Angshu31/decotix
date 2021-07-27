import { applySignature } from "../lib/signatures";

export const Model =
  (name?: string): ClassDecorator =>
  (target) => {
    const realname = name ?? target.name;
    applySignature(target, "model", { name: realname });
  };
