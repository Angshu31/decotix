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
      // The field must have a unique or id field, if there is no default attribute, we'll add one

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
    try {
      result.push(
        `  ${name} ${getTypeName(typeClass)}${
          nullable ? "?" : ""
        } ${fieldAttributes.map((x) => x.str).join(" ")}`
      );
    } catch (e) {
      throw new TypeError(
        `The type could not be read for field "${String(
          name
        )}" of model "${modelName}"${
          modelName !== ModelClass.name
            ? ` (class name: "${ModelClass.name}")`
            : ""
        }`
      );
    }

    // Auto inserting Relational fields (default for option: true)
    if (config.autoInsertRelationalFields ?? true) {
      const attribute = fieldAttributes.find(
        (x) => x.extraData.type === "relation"
      );

      const { fields, references } =
        (attribute?.extraData as _RelationMetadata)?.args.find(
          (x) => typeof x === "object"
        ) || {};

      // Skip the field if it's not a relation and it doesn't have a { field, references } object inside of it
      if (!fields || !references) continue;

      const target = new (typeClass as any)();

      const props: _PropertyMetadata[] =
        Reflect.getMetadata(_propKey, target) ?? [];

      for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const idx = references.indexOf(prop.name);

        const type = prop.getType();
        try {
          if (idx !== -1)
            result.push(
              `${fields[idx]} ${getTypeName(type)}${nullable ? "?" : ""}`
            );
        } catch (e) {
          throw new TypeError(
            `The type could not be read for field "${String(
              prop.name
            )}" of model "${modelName}"${
              modelName !== ModelClass.name
                ? ` (class name: "${ModelClass.name}")`
                : ""
            }`
          );
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
  if (Array.isArray(x)) return `${getTypeName(x[0])}[]`;

  const sig = getSignature(x);

  if (typeof x !== "function" && !sig)
    throw new TypeError(`Cannot get type name of "${String(x)}"`);

  return typeof x === "function"
    ? sig?.extraData?.name || x.name
    : sig.extraData.name;
};
