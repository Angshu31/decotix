import { join } from "path";
import { buildSchema } from ".";

(async () => {
  await buildSchema({
    // baseSchemas: [join(__dirname, "../src/test-dir/**/*.prisma")],
    // baseSchemas: ["C:\\Users\\ongsh\\hydralite\\api\\*.prisma"],
    input: [join(__dirname, "test-dir/**/*.*")],
    emitTo: join(__dirname, "../output.prisma"),
  });
})();
