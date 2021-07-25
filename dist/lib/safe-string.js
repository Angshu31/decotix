"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeString = void 0;
// Escapes characters
const safeString = (str) => JSON.stringify({ a: str }).slice(5, -1);
exports.safeString = safeString;
