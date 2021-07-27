import { join } from "path";
import { buildSchema } from ".";

it("generates model string", async () => {
  const str = await buildSchema({
    input: [join(__dirname, "test-dir/**/*")],
  });

  console.log(str);

  expect(str).toBeTruthy();
});
