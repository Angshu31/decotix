"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = exports._modelKey = void 0;
exports._modelKey = Symbol("prisma-model");
const Model = (name) => (target) => {
    Reflect.defineMetadata(exports._modelKey, name !== null && name !== void 0 ? name : target.name, target);
};
exports.Model = Model;
