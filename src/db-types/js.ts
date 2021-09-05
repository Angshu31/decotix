import { registerType } from "../lib/registerType";

registerType(Boolean, "Boolean");
registerType(Number, "Float");
registerType(String, "String");
registerType(Date, "DateTime");

if (typeof BigInt !== "undefined") registerType(BigInt, "BigInt");
