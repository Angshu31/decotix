export function Int() {}
export function Float() {}

// Creates a function with a name of `Unsupported("${api}")`
export const Unsupported = (api: string) => {
  const name = `Unsupported("${api}")`;
  return { [name]() {} }[name];
};
