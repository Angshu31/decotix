import { registerType } from "../lib/registerType";

export function Int() {}
export function Float() {}
export function Decimal() {}
export function DateTime() {}
export function Json() {}
export function Bytes() {}

for (const key in exports) {
  registerType(exports[key], key);
}
