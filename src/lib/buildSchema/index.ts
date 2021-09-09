import { readFile, writeFile } from "fs/promises";
import _glob from "glob";
import isGlob from "is-glob";
import { promisify } from "util";
import { BuildSchemaOptions } from "../../types/BuildSchemaOptions";
import { getStringifier } from "../stringifiers";

const glob = promisify(_glob);

export const buildSchema = async (options: BuildSchemaOptions) => {
  let results = [];

  let fireAllLoaded: () => void;
  const allLoadedPromise = new Promise(
    (resolve) => (fireAllLoaded = () => resolve(1))
  );

  // Add baseSchemas
  if (options.baseSchemas)
    for (const pathOrSchema of options.baseSchemas) {
      if (isGlob(pathOrSchema)) {
        const filenames = await glob(pathOrSchema);
        const contents = await Promise.all(
          filenames.map(async (x) => (await readFile(x)).toString())
        );
        results.push(...contents);
      } else {
        const content = await readFile(pathOrSchema);
        results.push(content.toString());
      }
    }

  const useStringifier = (obj: any) => {
    const stringifier = getStringifier(obj);

    if (stringifier)
      results.push(stringifier({ obj, allLoadedPromise, options }));
  };
  for (const filenameOrModelClass of options.input) {
    if (typeof filenameOrModelClass === "function") {
      useStringifier(filenameOrModelClass);
    } else {
      const filenames = await glob(filenameOrModelClass);

      for (const filepath of filenames) {
        const mod = require(filepath);
        useStringifier(mod);

        for (const prop of Object.values(mod)) {
          useStringifier(prop);
        }
      }
    }
  }

  fireAllLoaded();
  results = await Promise.all(results);

  if (!results.length) {
    throw new TypeError(
      "The input was empty, did you pass any arguments? Did you make sure the glob path is correct?"
    );
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
