import { getPrimaryProperties } from "../../../lib/getPrimaryProperties";
import { PriorityLevels } from "../../../lib/PriorityLevels";
import {
  ModelData,
  PropertyAttributeData,
  PropertyData,
} from "../../../types/ModelData";
import { _modelKey } from "../../Model";
import { PropertyDecoratorWrapper } from "../../PropertyDecorator";

export const createRelationDecorator = (
  ifInverese: (
    inverseProperty: PropertyData,
    inverseRelationAttr: PropertyAttributeData
  ) => void,
  ifNotInverse?: (thisProperty: PropertyData) => void,
  isArrayType?: boolean
) =>
  function OneToOne<T extends Function>(
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
              type: targetModelData.name + (isArrayType ? "[]" : ""),
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

          const inverseRelationAttr = inverseProperty.attributes.find(
            (x) => x.name === "relation"
          );
          if (inverseRelationAttr) {
            ifInverese(thisProperty, inverseRelationAttr);

            return;
          }

          if (ifNotInverse) ifNotInverse(thisProperty);

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
  };
