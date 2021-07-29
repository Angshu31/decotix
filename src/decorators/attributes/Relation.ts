import { safeString } from "../../lib/safe-string";
import { Attribute } from "./Attribute";

export const _relationKey = Symbol("prisma-relation");

export type _RelationMetadata = {
  type: "relation";
  args: any[];
};

type FieldsReferencesData = {
  fields?: string[];
  references?: string[];
};

export function Relation(data: FieldsReferencesData): PropertyDecorator;
export function Relation(name: string): PropertyDecorator;
export function Relation(
  name: string,
  data: FieldsReferencesData
): PropertyDecorator;
export function Relation(
  data: FieldsReferencesData & { name: string }
): PropertyDecorator;
export function Relation(...args: any[]): PropertyDecorator {
  return Attribute(
    `@relation(${args
      .map((a) =>
        typeof a === "string"
          ? safeString(a)
          : Object.entries(a)
              .map(([key, val]) => `${key}: [${(val as string[]).join(", ")}]`)
              .join(", ")
      )
      .join(", ")})`,
    { type: "relation", args }
  );
}
