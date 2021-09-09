import { createRelationDecorator } from "./common";
import { OneToOne } from "./OneToOne";

export const OneToMany = createRelationDecorator(() => {
  throw new Error(
    "Inverse field already is a relation. Did you use accidentaly use `OneToMany` on both sides of the relation? Or did you put in the wrong inverse field?"
  );
});

export const ManyToOne = createRelationDecorator(
  (property, relationAttr) => {
    property.attributes.push({
      name: "relation",
      args: [relationAttr.args[0]],
    });
  },
  () => {
    throw new Error(
      "Inverse field already is a relation. Did you use accidentaly use `ManyToOne` on both sides of the relation? Or did you put in the wrong inverse field?"
    );
  },
  true
);
