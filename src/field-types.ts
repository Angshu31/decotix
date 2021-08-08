export function Int() {}
export function Float() {}
export function Decimal() {}
export function DateTime() {}
export function Json() {}
export function Bytes() {}

// Creates a function with a name of `Unsupported("${api}")`
export const Unsupported = (api: string) => {
  const name = `Unsupported("${api}")`;
  return { [name]() {} }[name];
};
