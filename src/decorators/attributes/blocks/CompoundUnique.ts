import { BlockAttribute } from "./BlockAttribute";

export const CompoundUnique = <T extends any>(
  fields: (keyof T)[],
  name?: string
) =>
  BlockAttribute(
    `@@unique([${fields.join(", ")}]${name ? `, name: "${name}"` : ""})`,
    {
      type: "unique",
      fields,
      name,
    }
  );
