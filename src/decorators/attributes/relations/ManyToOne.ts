// import { createRelationDecorator } from "./common";

import { getPrimaryProperties } from "../../../lib/getPrimaryProperties";
import { PriorityLevels } from "../../../lib/PriorityLevels";
import { ModelData } from "../../../types/ModelData";
import { _modelKey } from "../../Model";
import { PropertyDecoratorWrapper } from "../../PropertyDecorator";

// export const ManyToOne = createRelationDecorator(() => {
//   // throw new Error(
//   //   "Inverse field already is a relation. Did you use accidentaly use `OneToMany` on both sides of the relation? Or did you put in the wrong inverse field?"
//   // );
// });

// export const OneToMany = createRelationDecorator(
//   (property, relationAttr) => {
//     property.attributes.push({
//       name: "relation",
//       args: [relationAttr.args[0]],
//     });
//   },
//   undefined,
//   true
// );

export function ManyToOne<T extends Function>(
  getTargetModel: () => T,
  inverseRelation:
    | ((data: Record<keyof T["prototype"], number>) => number)
    | string
): PropertyDecorator {
  return (target, propKey) => {
    const propName = String(propKey);

    let TargetModel: Function, targetModelData: ModelData;

    PropertyDecoratorWrapper(
      target.constructor,
      PriorityLevels.autoProperties,
      (data) => {
        TargetModel = getTargetModel();
        targetModelData =
          TargetModel &&
          (Reflect.getMetadata(_modelKey, TargetModel) as ModelData);

        if (!data.properties.has(propName)) {
          data.properties.set(propName, {
            name: propName,
            type: targetModelData.name,
            nullable: false,
            attributes: [],
          });
        }
      }
    );

    PropertyDecoratorWrapper(
      target.constructor,
      PriorityLevels.relation,
      (data) => {
        const TargetModel = getTargetModel();
        const targetModelData =
          TargetModel &&
          (Reflect.getMetadata(_modelKey, TargetModel) as ModelData);

        let thisProperty = data.properties.get(propName);

        if (!targetModelData) {
          throw new TypeError(
            `Target model of OneToOne relation ${target.constructor.name}.${propName} is not a valid model`
          );
        }

        let inverseFieldName: string = inverseRelation as any;

        if (typeof inverseRelation !== "string") {
          const keys = [...targetModelData.properties.keys()];
          const fakeData: any = {};

          for (let i = 0; i < keys.length; i++) fakeData[keys[i]] = i;

          inverseFieldName = keys[inverseRelation(fakeData)];
        }

        const inverseProperty =
          targetModelData.properties.get(inverseFieldName);

        if (!inverseProperty) throw new Error("Invalid inverse property");

        const relationName = `${data.name}_${propName}`;

        const references = getPrimaryProperties(targetModelData);
        const fields = [];

        for (let i = 0; i < references.length; i++) {
          const ref = references[i];
          const fieldName = propName + ref[0].toUpperCase() + ref.slice(1);
          fields.push(fieldName);

          const refProperty = targetModelData.properties.get(ref);

          data.properties.set(fieldName, {
            name: fieldName,
            type: refProperty.type,
            nullable: thisProperty.nullable,
            attributes: [
              refProperty.attributes.find((x) => x.name === "db.ObjectId"),
            ].filter((x) => x),
          });
        }

        thisProperty.attributes.push({
          name: "relation",
          args: [relationName, { fields, references }],
        });
      }
    );
  };
}

export function OneToMany<T extends Function>(
  getTargetModel: () => T,
  inverseRelation:
    | ((data: Record<keyof T["prototype"], number>) => number)
    | string
): PropertyDecorator {
  return (target, propKey) => {
    const propName = String(propKey);

    let TargetModel: Function, targetModelData: ModelData;

    PropertyDecoratorWrapper(
      target.constructor,
      PriorityLevels.autoProperties,
      (data) => {
        TargetModel = getTargetModel();
        targetModelData =
          TargetModel &&
          (Reflect.getMetadata(_modelKey, TargetModel) as ModelData);

        if (!data.properties.has(propName)) {
          data.properties.set(propName, {
            name: propName,
            type: targetModelData.name + "[]",
            nullable: false,
            attributes: [],
          });
        }
      }
    );

    PropertyDecoratorWrapper(
      target.constructor,
      PriorityLevels.relation,
      (data) => {
        const TargetModel = getTargetModel();
        const targetModelData =
          TargetModel &&
          (Reflect.getMetadata(_modelKey, TargetModel) as ModelData);

        let thisProperty = data.properties.get(propName);

        if (!targetModelData) {
          throw new TypeError(
            `Target model of OneToOne relation ${target.constructor.name}.${propName} is not a valid model`
          );
        }

        let inverseFieldName: string = inverseRelation as any;

        if (typeof inverseRelation !== "string") {
          const keys = [...targetModelData.properties.keys()];
          const fakeData: any = {};

          for (let i = 0; i < keys.length; i++) fakeData[keys[i]] = i;

          inverseFieldName = keys[inverseRelation(fakeData)];
        }

        thisProperty.attributes.push({
          name: "relation",
          args: [`${targetModelData.name}_${inverseFieldName}`],
        });

        // if (!inverseProperty) throw new Error("Invalid inverse property");

        // const relationName = `${data.name}_${propName}`;

        // const references = getPrimaryProperties(targetModelData);
        // const fields = [];

        // for (let i = 0; i < references.length; i++) {
        //   const ref = references[i];
        //   const fieldName = propName + ref[0].toUpperCase() + ref.slice(1);
        //   fields.push(fieldName);

        //   const refProperty = targetModelData.properties.get(ref);

        //   data.properties.set(fieldName, {
        //     name: fieldName,
        //     type: refProperty.type,
        //     nullable: thisProperty.nullable,
        //     attributes: [
        //       refProperty.attributes.find((x) => x.name === "db.ObjectId"),
        //     ].filter((x) => x),
        //   });
        // }

        // thisProperty.attributes.push({
        //   name: "relation",
        //   args: [relationName, { fields, references }],
        // });
      }
    );
  };
}
