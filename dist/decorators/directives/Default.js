"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Directive_1 = require("./Directive");
const Default = (default_) => Directive_1.Directive(`@default(${default_})`);
exports.Default = Default;
