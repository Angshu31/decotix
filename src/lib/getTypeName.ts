import { getSignature } from "./signatures";

export const getTypeName = (x: Function | object | [Function]) => {
  if (Array.isArray(x)) return `${getTypeName(x[0])}[]`;

  const sig = getSignature(x);

  if (typeof x !== "function" && !sig)
    throw new TypeError(`Cannot get type name of "${String(x)}"`);

  return typeof x === "function"
    ? sig?.extraData?.name || x.name
    : sig.extraData.name;
};
