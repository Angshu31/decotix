// Escapes characters
export const safeString = (str: string) =>
  JSON.stringify({ a: str }).slice(5, -1);
