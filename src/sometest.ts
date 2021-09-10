import "reflect-metadata";
import { join } from "path";
import { buildSchema } from "./lib/buildSchema";

(async () => {
  await buildSchema({
    // baseSchemas: [join(__dirname, "../src/test-dir/**/*.prisma")],
    // baseSchemas: ["C:\\Users\\ongsh\\hydralite\\api\\*.prisma"],
    input: [join(__dirname, "test-dir/**/*.*")],
    emitTo: join(__dirname, "../output.prisma"),
    prettify: false,
  });
})();
