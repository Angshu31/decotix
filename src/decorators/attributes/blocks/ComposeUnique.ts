import { ComposeBlockAttribute } from "./ComposeBlockAttribute";

export const ComposeUnique = ComposeBlockAttribute<[name?: string]>(
  () => ({
    get str() {
      return `@@unique([${this.extraData.fields.join(", ")}])`;
    },
    extraData: { type: "unique", fields: [] },
  }),
  (data, field) => {
    data.extraData.fields.push(field);
  },
  (C, [name]) => name ?? C
);
