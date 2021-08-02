import { BlockAttribute } from "./BlockAttribute";

export const CompoundUnique = (fields: string[]) =>
  BlockAttribute(`@@unique([${fields.join(", ")}])`, {
    type: "unique",
    fields,
  });
