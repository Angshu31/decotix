import { PriorityLevels } from "../../lib/PriorityLevels";
import { Attribute } from "./Attribute";

/**
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Text"): PropertyDecorator;
/**
 *  @param limit The max amount of characters that can be stored
 *
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Char", limit: number): PropertyDecorator;
/**
 *  @param limit The max amount of characters that can be stored
 *
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(
  typeName: "VarChar",
  limit: number
): PropertyDecorator;
/**
 *  @param limit The max amount of characters that can be stored
 *
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Bit", limit: number): PropertyDecorator;
/**
 *  @param limit The max amount of characters that can be stored
 *
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(
  typeName: "VarBit",
  limit?: number
): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "Uuid"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Xml"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "Inet"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *
 *  ### Notes
 *  *PostgreSQL*: Only available if [Citext extension is enabled](https://www.prisma.io/docs/concepts/components/prisma-schema/features-without-psl-equivalent/#enable-extensions-for-native-database-functions).
 */
export function NativeType(typeName: "Citext"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "Boolean"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "Integer"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "SmallInt"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "Oid"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "BigInt"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "DoublePrecision"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "Real"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(
  typeName: "Decimal",
  precision: number,
  scale: number
): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "Money"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 */
export function NativeType(typeName: "Timestamp", x: number): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(
  typeName: "Timestamptz",
  x: number
): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Date"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Time", x: number): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "Timetz", x: number): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 *   - MySQL
 */
export function NativeType(typeName: "Json"): PropertyDecorator;
/**
 *  Supported By:
 *   - PostgreSQL
 */
export function NativeType(typeName: "JsonB"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "TinyText"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "MediumText"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "LongText"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 *   - SQL Server (Preview)
 *
 *  ### Notes
 *  *MySQL*: `TINYINT` maps to `Int` if the max length is greater than 1 (for example, `TINYINT(2)`) or the default value is anything other than `1`, `0`, or `NULL`. `TINYINT(1)` maps to `Boolean`.
 */
export function NativeType(typeName: "TinyInt", x: number): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Int"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "UnsignedInt"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "UnsignedSmallInt"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "MediumInt"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "UnsignedMediumInt"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 *
 *  ### Notes
 *  *MySQL*: `TINYINT(1) UNSIGNED` maps to `Int`, not `Boolean`
 */
export function NativeType(typeName: "UnsignedTinyInt"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "Year"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "Float"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "Double"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "DateTime", x: number): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "LongBlob"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Binary"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "VarBinary"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "TinyBlob"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "Blob"): PropertyDecorator;
/**
 *  Supported By:
 *   - MySQL
 */
export function NativeType(typeName: "MediumBlob"): PropertyDecorator;
/**
 *  Supported By:
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "NChar", X: number): PropertyDecorator;
/**
 *  Supported By:
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "NVarChar", X: number): PropertyDecorator;
/**
 *  Supported By:
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "NText"): PropertyDecorator;
/**
 *  Supported By:
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "UniqueIdentifier"): PropertyDecorator;
/**
 *  Supported By:
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "DateTime2"): PropertyDecorator;
/**
 *  Supported By:
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "SmallDateTime"): PropertyDecorator;
/**
 *  Supported By:
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "DateTimeOffset"): PropertyDecorator;
/**
 *  Supported By:
 *   - SQL Server (Preview)
 */
export function NativeType(typeName: "Image"): PropertyDecorator;
/**
 *  Supported By:
 *   - MongoDB (Preview)
 */
export function NativeType(typeName: "Array", of: string): PropertyDecorator;

export function NativeType(typeName: string, ...args: any[]): PropertyDecorator;
export function NativeType(typeName: any, ...args: any[]): PropertyDecorator {
  return Attribute(PriorityLevels.afterProperties, () => ({
    name: "db." + typeName,
    args,
    noArgEncode: typeName === "Array",
  }));
}
