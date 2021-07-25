"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelToString = void 0;
const Directive_1 = require("../decorators/directives/Directive");
const Model_1 = require("../decorators/Model");
const Property_1 = require("../decorators/Property");
const modelToString = (ModelClass, config = {}) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const modelName = Reflect.getMetadata(Model_1._modelKey, ModelClass);
    const instance = new ModelClass();
    const props = (_a = Reflect.getMetadata(Property_1._propKey, instance)) !== null && _a !== void 0 ? _a : [];
    const directives = (_b = Reflect.getMetadata(Directive_1._directiveKey, instance)) !== null && _b !== void 0 ? _b : [];
    // Stores all the lines
    const result = [`model ${modelName} {`];
    for (const { name, nullable, getType } of props) {
        const typeClass = getType();
        const fieldDirectives = directives.filter((directive) => directive.field === name);
        result.push(`  ${name} ${Reflect.getMetadata(Model_1._modelKey, typeClass) || typeClass.name}${nullable ? "?" : ""} ${fieldDirectives.map((x) => x.str).join(" ")}`);
        // By default, option is true
        if ((_c = config.autoInsertRelationalFields) !== null && _c !== void 0 ? _c : true) {
            const { str } = fieldDirectives.find((a) => a.str.startsWith("@relation")) || {};
            console.log({ str });
            if (!str || !str.includes("fields: ["))
                continue;
            let fieldStr = str.slice(str.indexOf("fields: [") + 9);
            fieldStr = fieldStr.slice(0, fieldStr.indexOf("],"));
            console.log({ fieldStr });
            if (props.find((x) => x.name === fieldStr))
                continue;
            // Find the type of the id
            const targetInstance = new typeClass();
            const targetDirectives = (_d = Reflect.getMetadata(Directive_1._directiveKey, targetInstance)) !== null && _d !== void 0 ? _d : [];
            const targetProps = (_e = Reflect.getMetadata(Property_1._propKey, targetInstance)) !== null && _e !== void 0 ? _e : [];
            const idField = (_f = targetDirectives.find((x) => x.str.includes("@id"))) === null || _f === void 0 ? void 0 : _f.field;
            const idType = (_g = targetProps.find((x) => x.name === idField)) === null || _g === void 0 ? void 0 : _g.getType();
            result.push(`  ${fieldStr} ${Reflect.getMetadata(Model_1._modelKey, idType) || idType.name}`);
        }
    }
    result.push("}");
    return result.join("\n");
};
exports.modelToString = modelToString;
