import { applySignature, _Signature } from "./signatures";

type EnumSignatureData = { name: string };

export const registerEnums = (map: { [name: string]: any }) =>
  Object.entries(map).forEach(([name, theEnum]) =>
    applySignature(theEnum, "enum", { name } as EnumSignatureData)
  );

export const enumToString = (theEnum: any, sig: _Signature) => {
  const extraData = sig.extraData as EnumSignatureData;

  // Cut out numeric values (from numeric enums)
  const keys = Object.values(theEnum).filter((x) => typeof x === "string");

  return `enum ${extraData.name} {\n${keys.join("\n")}\n}`;
};
