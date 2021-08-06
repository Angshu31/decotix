import { BlockAttribute } from "./BlockAttribute";

export const CompoundUnique = (fields: string[], name?: string) =>
  BlockAttribute(
    `@@unique([${fields.join(", ")}]${name ? `, name: "${name}"` : ""})`,
    {
      type: "unique",
      fields,
      name,
    }
  );
