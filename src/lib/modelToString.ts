import { DefaultDirectiveType } from "../decorators/directives/Default";
import {
  _directiveKey,
  _DirectiveMetadata,
} from "../decorators/directives/Directive";
import { _modelKey } from "../decorators/Model";
import { _PropertyMetadata, _propKey } from "../decorators/Property";

export type ModelToStringConfig = {
  /**
   * Automatically adds the id field of a relation
   *
   * @example
   
  ```prisma
  model User {
    // ...
    profile   Profile \@relation(fields: [profileId], references: [id])
  
    // This `profileId` is auto-generated because of the `fields: [profileId]` above in the relation
    profileId String
  }
  ```
   */
  autoInsertRelationalFields?: boolean;
  /**
   * Automatically inserts a `@default` directive on IDs if absent
   *
   */
  autoInsertDefaultId?: DefaultDirectiveType;
};

export const modelToString = (
  ModelClass: { new (...args: any[]): any },
  config: ModelToStringConfig = {}
) => {
  const modelName = Reflect.getMetadata(_modelKey, ModelClass);

  const instance = new ModelClass();

  const props: _PropertyMetadata[] =
    Reflect.getMetadata(_propKey, instance) ?? [];

  const directives: _DirectiveMetadata[] =
    Reflect.getMetadata(_directiveKey, instance) ?? [];

  // Stores all the lines
  const result: string[] = [`model ${modelName} {`];

  for (const { name, nullable, getType } of props) {
    const typeClass = getType();

    const fieldDirectives = directives.filter(
      (directive) => directive.field === name
    );

    if (config.autoInsertDefaultId) {
      // The field must have an id, if there is no default field, we'll add one

      let idField,
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
      `  ${name} ${
        Reflect.getMetadata(_modelKey, typeClass) || typeClass.name
      }${nullable ? "?" : ""} ${fieldDirectives.map((x) => x.str).join(" ")}`
    );

    // By default, option is true
    if (config.autoInsertRelationalFields ?? true) {
      const { str } =
        fieldDirectives.find((a) => a.extraData.type === "relation") || {};

      if (!str || !str.includes("fields: [")) continue;

      let fieldStr = str.slice(str.indexOf("fields: [") + 9);
      fieldStr = fieldStr.slice(0, fieldStr.indexOf("],"));

      if (props.find((x) => x.name === fieldStr)) continue;

      // Find the type of the id

      const targetInstance = new (typeClass as any)();

      // Directives and Props of the target `typeClass`
      const targetDirectives: _DirectiveMetadata[] =
        Reflect.getMetadata(_directiveKey, targetInstance) ?? [];

      const targetProps: _PropertyMetadata[] =
        Reflect.getMetadata(_propKey, targetInstance) ?? [];

      // The field that has the `@id` directive
      const idField = targetDirectives.find(
        (x) => x.extraData.type === "id"
      )?.field;

      // The given type of the idField
      const idType = targetProps.find((x) => x.name === idField)?.getType();

      // Append the new field to the results
      result.push(
        `  ${fieldStr} ${Reflect.getMetadata(_modelKey, idType) || idType.name}`
      );
    }
  }

  result.push("}");

  return result.join("\n");
};
