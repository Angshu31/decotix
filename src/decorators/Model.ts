import { applySignature } from "../lib/signatures";

export type ModelOptions = {
  /**
   * Abstract models are bases that other models can be built on top of, they are not treated as actual models.
   */
  isAbstract?: boolean;
};

export function Model(name?: string): ClassDecorator;
export function Model(options?: ModelOptions): ClassDecorator;
export function Model(name?: string, options?: ModelOptions): ClassDecorator;
export function Model(...args: any[]): ClassDecorator {
  const firstArg = args[0];
  const name = typeof firstArg === "string" ? firstArg : null;
  const options = typeof firstArg === "object" ? firstArg : args[1];

  return (target) => {
    const realname = name ?? target.name;
    applySignature(target, "model", { name: realname, options });
  };
}
