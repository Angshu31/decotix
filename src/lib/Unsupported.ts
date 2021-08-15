type UnsupportedNativeTypes =
  | "interval"
  | "cidr"
  | "macaddr"
  | "tsvector"
  | "tsquery"
  | "int4range"
  | "int8range"
  | "numrange"
  | "tsrange"
  | "tstzrange"
  | "daterange"
  | "point"
  | "line"
  | "lseg"
  | "box"
  | "path"
  | "polygon"
  | "circle"
  | "set"
  | "geometry"
  | "linestring"
  | "multipoint"
  | "multilinestring"
  | "multipolygon"
  | "geometrycollection"
  | "Json"
  | "Bytes";

/**
 * Use native database types that are unsupported by prisma.
 *
 * **Note**: While we put all the unsupported types for intellisense,
 * it's possible that it new ones may appear that we did not add yet.
 * If you need to use one of these, just pass it in as the argument
 * regardless (opening an issue about it would also be appreciated).
 */
export const Unsupported = (type: UnsupportedNativeTypes | (string & {})) => {
  const name = `Unsupported("${type}")`;
  return { [name]() {} }[name];
};
