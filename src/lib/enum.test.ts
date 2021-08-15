import "reflect-metadata";
import { enumToString, registerEnums } from "./enum";
import { getSignature } from "./signatures";

enum Numerical {
  firstOption,
  lastOption,
}

enum StringBased {
  firstOption = "FIRST",
  lastOption = "LAST",
}

const both = { Numerical, StringBased };
const entries = Object.entries(both);

it("registers enums", () => {
  registerEnums(both);

  for (const [name, theEnum] of entries) {
    expect(getSignature(theEnum)).toEqual({
      type: "enum",
      extraData: { name },
    });
  }
});

it("can turn enums into strings", () => {
  for (const [name, theEnum] of entries) {
    const str = enumToString(theEnum, getSignature(theEnum));

    expect(typeof str === "string").toBeTruthy();
    expect(str.split("\n").map((x) => x.trim())).toEqual([
      `enum ${name} {`,
      ...(name === "Numerical"
        ? ["firstOption", "lastOption"]
        : ["FIRST", "LAST"]),
      `}`,
    ]);
  }
});
