import { createEnum, ValuesOf } from "..";

export const Role = createEnum("Role", ["ADMIN", "MOD"]);

export type Role = ValuesOf<typeof Role>;
