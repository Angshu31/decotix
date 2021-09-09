import { _modelKey } from "../../decorators/Model";
import { _effects_key } from "../../decorators/PropertyDecorator";
import { ModelData } from "../../types/ModelData";

export async function ModelStringifier(Target: any, allLoaded: Promise<void>) {
  let res = "";

  const data = Reflect.getMetadata(_modelKey, Target) as ModelData;

  if (!data) {
    throw new Error(`Invalid Model: ${Target}`);
  }

  const effects = Reflect.getMetadata(_effects_key, Target);

  for (const priorityLevel of effects) {
    if (priorityLevel)
      for (const effect of priorityLevel) {
        effect(data);
      }
  }

  await allLoaded;

  if (effects[-1]) {
    for (const effect of effects[-1]) effect(data);
  }

  res += `model ${data.name} {\n`;

  for (const [propName, prop] of data.properties) {
    res += `${propName} ${prop.type}${prop.nullable ? "?" : ""}`;

    if (prop.attributes.length) {
      res += " ";

      for (const attr of prop.attributes) {
        res += "@" + attr.name;

        if (attr.args?.length) res += `(${attr.args.map(argToString)})`;
      }
    }

    res += "\n";
  }

  for (const blockAttr of data.blockAttributes) {
    res += `@@${blockAttr.name}([${blockAttr.fields.join(", ")}])\n`;
  }

  res += "}";

  return res;
}

const argToString = (arg: any) => {
  if (typeof arg === "string") return `"${arg}"`;
  if (Array.isArray(arg)) return `[${arg.join(", ")}]`;
  if (typeof arg === "object")
    return Object.keys(arg)
      .map((key) => `${key}: ${argToString(arg[key])}`)
      .join(", ");

  return String(arg);
};
