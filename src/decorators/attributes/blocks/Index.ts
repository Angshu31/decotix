import { BlockAttribute } from "./BlockAttribute";

export const Index = (fields: string[], name?: string) =>
  BlockAttribute(
    `@@index([${fields.join(", ")}]${name ? `, name: "${name}"` : ""})`,
    {
      type: "index",
      fields,
      name,
    }
  );
