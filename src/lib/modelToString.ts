import { _RelationMetadata } from "..";
import {
  _directiveKey,
  _DirectiveMetadata,
} from "../decorators/directives/Directive";
import { _PropertyMetadata, _propKey } from "../decorators/Property";
import { BuildSchemaOptions } from "./BuildSchemaOptions";
import { getSignature } from "./signatures";

export const modelToString = (
  ModelClass: { new (...args: any[]): any },
  config: Partial<BuildSchemaOptions> = {}
) => {
  const modelSig = getSignature(ModelClass);
  const modelName = modelSig?.extraData?.name;

  const instance = new ModelClass();

  const props: _PropertyMetadata[] =
    Reflect.getMetadata(_propKey, instance) ?? [];

  const directives: _DirectiveMetadata[] =
    Reflect.getMetadata(_directiveKey, instance) ?? [];

  let hasIdField: boolean = false;

  // Stores all the lines
  const result: string[] = [`model ${modelName} {`];

  for (const { name, nullable, getType } of props) {
    const typeClass = getType() as Function;

    const fieldDirectives = directives.filter(
      (directive) => directive.field === name
    );

    if (!hasIdField && fieldDirectives.find((x) => x.extraData.type === "id"))
      hasIdField = true;

    if (config.autoInsertDefaultId) {
      // The field must have an id, if there is no default field, we'll add one

      let idField: string,
        hasDefault = false;
      for (const x of fieldDirectives) {
        if (x.extraData.type === "id") idField = x.field;
        if (x.extraData.type === "default") hasDefault = true;
      }

      if (!idField || hasDefault) continue;

      const newDirective = {
        field: idField,
        str: `@default(${config.autoInsertDefaultId})`,
        extraData: { type: "default" },
      };

      directives.push(newDirective);
      fieldDirectives.push(newDirective);
    }

    // Adds the line of prisma code for the field
    result.push(
      `  ${name} ${getSignature(typeClass)?.extraData.name || typeClass.name}${
        nullable ? "?" : ""
      } ${fieldDirectives.map((x) => x.str).join(" ")}`
    );

    // By default, option is true
    if (config.autoInsertRelationalFields ?? true) {
      const directive = fieldDirectives.find(
        (x) => x.extraData.type === "relation"
      );

      const fieldName = (directive?.extraData as _RelationMetadata)?.args.find(
        (x) => typeof x === "object"
      )?.fields?.[0];

      if (!fieldName) continue;

      const target = new (typeClass as any)();

      const targetProps: _PropertyMetadata[] =
        Reflect.getMetadata(_propKey, target) ?? [];

      const targetDirectives: _DirectiveMetadata[] =
        Reflect.getMetadata(_directiveKey, target) ?? [];

      const idDirective = targetDirectives.find(
        (x) => x.extraData.type === "id"
      );

      if (!idDirective) {
        throw new Error(`Model ${typeClass.name} does not have a id field`);
      }

      const idFieldName = idDirective.field;
      const idType = targetProps.find((x) => x.name === idFieldName).getType();

      result.push(`  ${fieldName} ${getTypeName(idType)}`);
    }
  }

  if (!hasIdField) {
    throw new Error(`Model ${ModelClass} does not have an id field`);
  }

  result.push("}");

  const schema = result.join("\n");

  return schema;
};

const getTypeName = (x: Function | object) => {
  const sig = getSignature(x);
  return typeof x === "function"
    ? sig?.extraData?.name || x.name
    : sig.extraData.name;
};
