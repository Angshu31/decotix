import { Attribute } from "./Attribute";

export function NativeType(typeName: "ByteA", n: number): PropertyDecorator;
export function NativeType(
  typeName: "Timestamptz",
  n: number
): PropertyDecorator;
export function NativeType(typeName: "Time", n: number): PropertyDecorator;
export function NativeType(typeName: "Timetz", n: number): PropertyDecorator;
export function NativeType(
  typeName: "Decimal",
  precision: number,
  scale: number
): PropertyDecorator;
export function NativeType(typeName: "Real"): PropertyDecorator;
export function NativeType(typeName: "SmallInt"): PropertyDecorator;
export function NativeType(typeName: "Char"): PropertyDecorator;
export function NativeType(typeName: "VarChar"): PropertyDecorator;
export function NativeType(typeName: "Money"): PropertyDecorator;
export function NativeType(typeName: "Date"): PropertyDecorator;
export function NativeType(typeName: "Inet"): PropertyDecorator;
export function NativeType(typeName: "Bit", n: number): PropertyDecorator;
export function NativeType(typeName: "VarBit", n: number): PropertyDecorator;
export function NativeType(typeName: "Oid"): PropertyDecorator;
export function NativeType(typeName: "Uuid"): PropertyDecorator;
/**
 *  *Notes for MySQL users: JSON is supported in MySQL 5.7+ only*
 */
export function NativeType(typeName: "Json"): PropertyDecorator;
export function NativeType(typeName: "Xml"): PropertyDecorator;
/**
 * Only available if [Citext extension is enabled](https://www.prisma.io/docs/concepts/components/prisma-schema/features-without-psl-equivalent/#enable-extensions-for-native-database-functions).
 */
export function NativeType(typeName: "Citext"): PropertyDecorator;
export function NativeType(typeName: "UnsignedBigInt"): PropertyDecorator;
export function NativeType(typeName: "TinyInt", n: number): PropertyDecorator;
export function NativeType(typeName: "VarBinary"): PropertyDecorator;
export function NativeType(typeName: "LongBlob"): PropertyDecorator;
export function NativeType(typeName: "TinyBlob"): PropertyDecorator;
export function NativeType(typeName: "MediumBlob"): PropertyDecorator;
export function NativeType(typeName: "Blob"): PropertyDecorator;
export function NativeType(typeName: "Binary"): PropertyDecorator;
export function NativeType(typeName: "TimeStamp"): PropertyDecorator;
export function NativeType(typeName: "Float"): PropertyDecorator;
export function NativeType(typeName: "Double"): PropertyDecorator;
export function NativeType(typeName: "UnsignedSmallInt"): PropertyDecorator;
export function NativeType(typeName: "UnsignedMediumInt"): PropertyDecorator;
export function NativeType(typeName: "Int"): PropertyDecorator;
export function NativeType(typeName: "UnsignedInt"): PropertyDecorator;
export function NativeType(typeName: "TinyInt", n: number): PropertyDecorator;
export function NativeType(
  typeName: "UnsignedTinyInt",
  n: number
): PropertyDecorator;
export function NativeType(typeName: "Year"): PropertyDecorator;
export function NativeType(typeName: "TinyText"): PropertyDecorator;
export function NativeType(typeName: "Text"): PropertyDecorator;
export function NativeType(typeName: "MediumText"): PropertyDecorator;
export function NativeType(typeName: "LongText"): PropertyDecorator;
export function NativeType(typeName: "NChar", n: number): PropertyDecorator;
export function NativeType(typeName: "NVarChar", n: number): PropertyDecorator;
export function NativeType(typeName: "NText"): PropertyDecorator;
export function NativeType(
  typeName: "UniqueIdentifier",
  n: number
): PropertyDecorator;
export function NativeType(typeName: "SmallMoney"): PropertyDecorator;
export function NativeType(typeName: "DateTime"): PropertyDecorator;
export function NativeType(typeName: "DateTime2"): PropertyDecorator;
export function NativeType(typeName: "SmallDateTime"): PropertyDecorator;
export function NativeType(typeName: "DateTimeOffset"): PropertyDecorator;
export function NativeType(typeName: "Image"): PropertyDecorator;

export function NativeType(typeName: string, ...args: any[]): PropertyDecorator;
export function NativeType(typeName: any, ...args: any[]): PropertyDecorator {
  return Attribute(
    `@db.${typeName}` +
      (args.length
        ? `(${args
            .map((x) => (typeof x === "string" ? `"${x}"` : x))
            .join(", ")})`
        : "")
  );
}
