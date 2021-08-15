import { safeString } from "../../lib/safe-string";
import { Attribute } from "./Attribute";

export const _relationKey = Symbol("prisma-relation");

export type _RelationMetadata = {
  type: "relation";
  args: any[];
};

type FieldsReferencesData<ThisModel, OtherModel> = {
  fields?: (keyof ThisModel | (string & {}))[];
  references?: (keyof OtherModel | (string & {}))[];
};

export function Relation<ThisModel = any, OtherModel = any>(
  data: FieldsReferencesData<ThisModel, OtherModel>
): PropertyDecorator;
export function Relation(name: string): PropertyDecorator;
export function Relation<ThisModel = any, OtherModel = any>(
  name: string,
  data: FieldsReferencesData<ThisModel, OtherModel>
): PropertyDecorator;
export function Relation<ThisModel = any, OtherModel = any>(
  data: FieldsReferencesData<ThisModel, OtherModel> & { name: string }
): PropertyDecorator;
export function Relation<OtherModel = any>(
  name: string,
  data: (keyof OtherModel)[]
): PropertyDecorator;
export function Relation<OtherModel = any>(
  data: (keyof OtherModel)[]
): PropertyDecorator;
export function Relation(...args: any[]): PropertyDecorator {
  return (target, propKey) => {
    const mappedArgs = args.map((a) =>
      Array.isArray(a) ? { fields: [String(propKey) + "Id"], references: a } : a
    );

    Attribute(
      `@relation(${mappedArgs
        .map((a) => {
          if (typeof a === "string") return `"${a}"`;

          return Object.entries(a)
            .map(([key, val]) => `${key}: [${(val as string[]).join(", ")}]`)
            .join(", ");
        })
        .join(", ")})`,
      { type: "relation", args: mappedArgs }
    )(target, propKey);
  };
}
