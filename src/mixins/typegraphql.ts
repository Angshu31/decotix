import { registerType } from "../lib/registerType";

const { Int, Float, GraphQLTimeStampScalar } = require("type-graphql");

registerType(Int, "Int");
registerType(Float, "Float");
registerType(GraphQLTimeStampScalar, "DateTime");
