import { ComposeBlockAttribute } from "./ComposeBlockAttribute";

export const ComposeIndex = ComposeBlockAttribute<[name?: string]>(
  (key) => ({
    get str() {
      return `@@index([${this.extraData.fields.join(", ")}]${
        typeof key === "string" ? `, name: "${key}"` : ""
      })`;
    },
    extraData: { type: "index", fields: [] },
  }),
  (data, field) => {
    data.extraData.fields.push(field);
  },
  (C, [name]) => name ?? C
);
