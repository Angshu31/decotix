import { applySignature, _Signature } from "./signatures";

type GeneratorSignatureData = { name: string };

/**
 *
 * *Note*: While you may use this api to create generators we recommend that you
 * put generators and datasources in a base prisma file. Please see the "baseSchemas"
 * option of `buildSchema`
 *
 *  @example
 * ```
 * // prisma-client.ts
 * import { createGenerator } from "decotix";
 *
 * export default createGenerator({
 *   provider = "prisma-client-js"
 * })
 * ```
 */
export const createGenerator = (data: {
  provider: string;
  name: string;
  [key: string]: string;
}) => {
  const x = { ...data };
  delete x.name;

  applySignature(x, "generator", { name: data.name || "db" });

  return x;
};

export const generatorToString = (generator: any, sig: _Signature) => {
  const extraData = sig.extraData as GeneratorSignatureData;

  return `generator ${extraData.name} {\n${Object.entries(generator)
    .map(([x, y]) => `${x} = "${y}"`)
    .join("\n")}\n}`;
};
