import { applySignature } from "./signatures";

/**
 * Registers a type: This allows you to associate any object or function with a prisma type.
 */
export const registerType = (obj: any, name: string) =>
  applySignature(obj, name, { name });
