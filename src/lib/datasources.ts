import { applySignature, _Signature } from "./signatures";

type DatasourceSignatureData = { name: string };

export const ds_env = (envVarName: string) => `env("${envVarName}")`;
export const dsenv = ds_env;

/**
 *  @example
 * ```
 * // datasource.ts
 * import { createDatasource, ds_env } from "decotix";
 *
 * export default createDatasource({
 *    provider: "postgresql",
 *    url: ds_env("DATABASE_URL")
 * })
 * ```
 */
export const createDatasource = (data: {
  provider: string;
  url?: string;
  name?: "db" | (string & {});
}) => {
  const x = { ...data };
  delete x.name;

  applySignature(x, "datasource", { name: data.name || "db" });

  return x;
};

export const datasourceToString = (datasource: any, sig: _Signature) => {
  const extraData = sig.extraData as DatasourceSignatureData;

  const ds = { ...datasource };

  if (ds.url && !ds.url.startsWith("env")) {
    ds.url = `"${ds.url}"`;
  }

  return `datasource ${extraData.name} {\n${Object.entries(ds)
    .map(
      ([x, y]) =>
        `${x} = ${typeof y === "string" && y.startsWith("env") ? y : `"${y}"`}`
    )
    .join("\n")}\n}`;
};
