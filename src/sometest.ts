import { join } from "path";
import { buildSchema } from ".";

(async () => {
  await buildSchema({
    // baseSchemas: [join(__dirname, "../src/test-dir/**/*.prisma")],
    input: [join(__dirname, "test-dir/**/*.*")],
    emitTo: join(__dirname, "../output.prisma"),
  });
})();
