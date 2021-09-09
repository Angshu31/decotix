import { ModelData } from "../types/ModelData";

export const getPrimaryProperties = (data: ModelData) => {
  let best: string[];

  for (const [propName, prop] of data.properties) {
    for (const attr of prop.attributes) {
      if (attr.name === "id") return [propName];
      if (attr.name === "unique") best = [propName];
    }
  }

  if (!best) {
    for (const blockAttr of data.blockAttributes) {
      if (blockAttr.name === "id") return blockAttr.fields;
      if (blockAttr.name === "unique") {
        best = blockAttr.fields;
      }
    }
  }

  if (!best)
    throw new TypeError(
      `Model ${data.name} does not have a unique or id field(s)`
    );

  return best;
};
