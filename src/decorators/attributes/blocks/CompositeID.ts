import { BlockAttribute } from "./BlockAttribute";

export const CompositeID = <T = any>(fields: (keyof T)[]) =>
  BlockAttribute(`@@id([${fields.join(", ")}])`, {
    type: "id",
    fields,
  });
