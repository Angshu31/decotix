import { ComposeBlockAttribute } from "./ComposeBlockAttribute";

export const ComposeID = ComposeBlockAttribute(
  () => ({
    get str() {
      return `@@id([${this.extraData.fields.join(", ")}])`;
    },
    extraData: { type: "id", fields: [] },
  }),
  (data, field) => {
    data.extraData.fields.push(field);
  }
);
