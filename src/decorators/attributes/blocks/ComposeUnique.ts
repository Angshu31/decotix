import { ComposeBlockAttribute } from "./ComposeBlockAttribute";

export const ComposeUnique = ComposeBlockAttribute<[name?: string]>(
  (key) => ({
    get str() {
      return `@@unique([${this.extraData.fields.join(", ")}]${
        typeof key === "string" ? `, name: "${key}"` : ""
      })`;
    },
    extraData: { type: "unique", fields: [] },
  }),
  (data, field) => {
    data.extraData.fields.push(field);
  },
  (C, [name]) => name ?? C
);