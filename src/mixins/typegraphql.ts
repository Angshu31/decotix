import { registerType } from "../lib/registerType";

const { Int, Float } = require("type-graphql");

registerType(Int, "Int");
registerType(Float, "Float");
