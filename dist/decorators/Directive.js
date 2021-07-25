"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directive = exports._directiveKey = void 0;
exports._directiveKey = Symbol("prisma-directive");
function Directive(str) {
    return (target, name) => {
        Reflect.defineMetadata(exports._directiveKey, [...(Reflect.getMetadata(exports._directiveKey, target) || []), { name, str }], target);
    };
}
exports.Directive = Directive;
