import { promisify } from "util";
import _glob from "glob";
import { getSignature, _Signature } from "./signatures";
import { modelToString } from "./modelToString";
import { BuildSchemaOptions } from "./BuildSchemaOptions";
import { enumToString } from "./enum";
import { readFile, writeFile } from "fs/promises";
import isGlob from "is-glob";
import { datasourceToString } from "./datasources";

const glob = promisify(_glob);

export { BuildSchemaOptions };

export const buildSchema = async (
  options: BuildSchemaOptions
): Promise<string> => {
  const results = [];

  const useClass = (struct: any, sig: _Signature) => {
    if (sig.type === "model") results.push(modelToString(struct, options));
    if (sig.type === "enum") results.push(enumToString(struct, sig));
    if (sig.type === "datasource")
      results.push(datasourceToString(struct, sig));
  };

  if (options.baseSchemas)
    for (const pathOrSchema of options.baseSchemas) {
      if (!isGlob(pathOrSchema)) {
        results.push(pathOrSchema);
      } else {
        const filenames = await glob(pathOrSchema);
        const contents = await Promise.all(
          filenames.map(async (x) => (await readFile(x)).toString())
        );
        results.push(...contents);
      }
    }

  for (const filenameOrModelClass of options.input) {
    if (typeof filenameOrModelClass === "function") {
      const sig = getSignature(filenameOrModelClass);
      if (!sig)
        throw new TypeError(
          `A non-model class/function ${filenameOrModelClass.name} was passed into buildSchema. Did you forget to decorate it with "@Model()"?`
        );
      useClass(filenameOrModelClass, sig);
    } else {
      const filenames = await glob(filenameOrModelClass);

      for (const filepath of filenames) {
        const mod = require(filepath);
        const signature = getSignature(mod);

        if (signature) {
          useClass(mod, signature);
          continue;
        }

        for (const prop of Object.values(mod)) {
          const signature = getSignature(prop);
          if (signature) useClass(prop, signature);
        }
      }
    }
  }

  let schema = results.join("\n\n");

  if (options.prettify ?? true) {
    const { formatSchema } = await import(
      "@prisma/sdk/dist/engine-commands/formatSchema"
    );
    schema = await formatSchema({ schema });
  }

  if (options.emitTo) {
    await writeFile(options.emitTo, schema);
  }

  return schema;
};
