import { createRelationDecorator } from "./common";

export const OneToOne = createRelationDecorator((property, relationAttr) => {
  property.nullable = true;
  property.attributes.push({
    name: "relation",
    args: [relationAttr.args[0]],
  });
});
