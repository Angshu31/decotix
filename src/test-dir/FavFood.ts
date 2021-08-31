import { createEnum, EnumValues } from "../lib/enum";

export const FavFood = createEnum("FavFood", {
  apple: "APPLE",
  banana: "BANANA",
});

export type FavFood = EnumValues<typeof FavFood>;
