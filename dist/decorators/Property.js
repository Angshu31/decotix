"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = exports._propKey = void 0;
const db_types_1 = require("../db-types");
exports._propKey = Symbol("prisma-model-props");
function Property(...args) {
    return (target, name) => {
        var _a;
        const getType = typeof args[0] === "function"
            ? args[0]
            : () => {
                const x = Reflect.getMetadata("design:type", target, name);
                if (x === Number)
                    return db_types_1.Float;
                return x;
            };
        const { nullable = false } = typeof args[0] === "object" ? args[0] : (_a = args[1]) !== null && _a !== void 0 ? _a : {};
        Reflect.defineMetadata(exports._propKey, [
            ...(Reflect.getMetadata(exports._propKey, target) || []),
            { name: String(name), nullable, getType },
        ], target);
    };
}
exports.Property = Property;
