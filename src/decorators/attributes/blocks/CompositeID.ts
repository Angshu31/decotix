import { BlockAttribute } from "./BlockAttribute";

export const CompositeID = (fields: string[]) =>
  BlockAttribute(`@@id([${fields.join(", ")}])`, {
    type: "composite-id",
    fields,
  });
