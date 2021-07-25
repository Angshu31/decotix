"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relation = exports._relationKey = void 0;
const safe_string_1 = require("../../lib/safe-string");
const Directive_1 = require("./Directive");
exports._relationKey = Symbol("prisma-relation");
function Relation(...args) {
    return Directive_1.Directive(`@relation(${args
        .map((a) => typeof a === "string"
        ? safe_string_1.safeString(a)
        : Object.entries(a)
            .map(([key, val]) => `${key}: [${val.join(", ")}]`)
            .join(", "))
        .join(", ")})`);
}
exports.Relation = Relation;
