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

export function Relation(): PropertyDecorator;

export function Relation<OtherModel = any>(
  name: string,
  references: (keyof OtherModel)[]
): PropertyDecorator;

export function Relation<OtherModel = any>(
  references: (keyof OtherModel)[]
): PropertyDecorator;

export function Relation(
  data: FieldsReferencesData<any, any>
): PropertyDecorator;
export function Relation<ThisModel, OtherModel>(
  data: FieldsReferencesData<ThisModel, OtherModel>
): PropertyDecorator;

export function Relation(name: string): PropertyDecorator;
export function Relation(name: string, autofill?: boolean): PropertyDecorator;

export function Relation<ThisModel, OtherModel>(
  name: string,
  data: FieldsReferencesData<ThisModel, OtherModel>
): PropertyDecorator;
export function Relation(
  name: string,
  data: FieldsReferencesData<any, any>
): PropertyDecorator;

export function Relation<ThisModel, OtherModel>(
  data: FieldsReferencesData<ThisModel, OtherModel> & { name: string }
): PropertyDecorator;
export function Relation(
  data: FieldsReferencesData<any, any> & { name: string }
): PropertyDecorator;

export function Relation(...args: any[]): PropertyDecorator {
  return (target, propKey) => {
    if (args.length === 0) {
      args.push(["id"]);
    } else if (typeof args[0] === "string" && args[1] === true) {
      args[1] = ["id"];
    }

    const mappedArgs = args.map((a) =>
      Array.isArray(a)
        ? {
            fields: a.map(
              (ref) => String(propKey) + ref[0].toUpperCase() + ref.slice(1)
            ),
            references: a,
          }
        : a
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
