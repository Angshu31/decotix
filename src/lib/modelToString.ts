import { _RelationMetadata } from "..";
import {
  _attributeKey,
  _AttributeMetadata,
} from "../decorators/attributes/Attribute";
import {
  _blockAttributeKey,
  _BlockAttributeMetadata,
} from "../decorators/attributes/blocks/BlockAttribute";
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

  const attributes: _AttributeMetadata[] =
    Reflect.getMetadata(_attributeKey, instance) ?? [];

  const blockAttributes: _BlockAttributeMetadata[] =
    Reflect.getMetadata(_blockAttributeKey, ModelClass) ?? [];

  let hasIdField: boolean = false;

  // Stores all the lines
  const result: string[] = [`model ${modelName} {`];

  for (const { name, nullable, getType } of props) {
    const typeClass = getType() as Function;

    const fieldAttributes = attributes.filter(
      (attribute) => attribute.field === name
    );

    if (
      !hasIdField &&
      fieldAttributes.find(
        (x) => x.extraData.type === "id" || x.extraData.type === "unique"
      )
    )
      hasIdField = true;

    if (config.autoInsertDefaultId) {
      // The field must have a unique or id field, if there is no default field, we'll add one

      let idField: string,
        hasDefault = false;
      for (const x of fieldAttributes) {
        if (x.extraData.type === "id" || x.extraData.type === "unique")
          idField = x.field;
        if (x.extraData.type === "default") hasDefault = true;
      }

      if (!idField || hasDefault) continue;

      const newAttribute = {
        field: idField,
        str: `@default(${config.autoInsertDefaultId})`,
        extraData: { type: "default" },
      };

      attributes.push(newAttribute);
      fieldAttributes.push(newAttribute);
    }

    // Adds the line of prisma code for the field
    result.push(
      `  ${name} ${getSignature(typeClass)?.extraData.name || typeClass.name}${
        nullable ? "?" : ""
      } ${fieldAttributes.map((x) => x.str).join(" ")}`
    );

    // By default, option is true
    if (config.autoInsertRelationalFields ?? true) {
      const attribute = fieldAttributes.find(
        (x) => x.extraData.type === "relation"
      );

      const { fields, references } =
        (attribute?.extraData as _RelationMetadata)?.args.find(
          (x) => typeof x === "object"
        ) || {};

      if (!fields) continue;

      for (let i = 0; i < fields.length; i++) {
        const fieldName = fields[i];
        const target = new (typeClass as any)();

        const targetProps: _PropertyMetadata[] =
          Reflect.getMetadata(_propKey, target) ?? [];

        const targetAttributes: _AttributeMetadata[] =
          Reflect.getMetadata(_attributeKey, target) ?? [];

        const targetBlockAttributes: _BlockAttributeMetadata[] =
          Reflect.getMetadata(_blockAttributeKey, typeClass) ?? [];

        const idAttr = targetAttributes.find(
          (x) => x.extraData.type === "id" || x.extraData.type === "unique"
        );

        const idBlockAttr = targetBlockAttributes.find(
          (x) => x.extraData.type === "id" || x.extraData.type === "unique"
        );

        // console.log({ idAttr, idBlockAttr, f: idBlockAttr.extraData.fields });

        if (!idAttr && !idBlockAttr) {
          console.log(targetBlockAttributes);
          throw new Error(
            `Model ${typeClass.name} does not have a unique field/fields. Did you forget to decorate a field with "@ID()"?`
          );
        } else if (idAttr) {
          const idFieldName = idAttr.field;
          const idType = targetProps
            .find((x) => x.name === idFieldName)
            .getType();

          result.push(`${fieldName} ${getTypeName(idType)}`);
        } else {
          const ref = (references || (idBlockAttr.extraData as any).fields)[i];

          const idType = targetProps.find((x) => x.name === ref).getType();

          result.push(`${fieldName} ${getTypeName(idType)}`);
        }
      }
    }
  }

  for (const blockAttr of blockAttributes) {
    if (
      !hasIdField &&
      (blockAttr.extraData.type === "id" ||
        blockAttr.extraData.type === "unique")
    )
      hasIdField = true;

    result.push(blockAttr.str);
  }

  if (!hasIdField) {
    throw new Error(`Model ${ModelClass.name} does not have an id field`);
  }

  result.push("}");

  const schema = result.join("\n");

  return schema;
};

const getTypeName = (x: Function | object | [Function]) => {
  if (Array.isArray(x)) return `${getTypeName(x)}[]`;

  const sig = getSignature(x);
  return typeof x === "function"
    ? sig?.extraData?.name || x.name
    : sig.extraData.name;
};
