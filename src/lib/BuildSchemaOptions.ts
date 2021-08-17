import { DefaultAttributeType } from "../decorators/attributes/Default";

export type BuildSchemaOptions = {
  /**
   * The input. This can be an array containing globs or classes representing models.
   */
  input: (string | { new (...args: any[]): any })[];

  /**
   * The prisma schema input. The generated schema will be merged with these base schemas.
   * Globs are permitted, meaning you can provide a glob path to where one or more base schemas are.
   */
  baseSchemas?: string[];

  /**
   * Outputs the generated schema to a desired file.
   */
  emitTo?: string;

  /**
   * Automatically adds the fields of a relation
   *
   * Default: `false`
   *
   *
   * Example:
   * ```prisma
   * model User {
   *   profile   Profile   @relation(fields: [profileId], references: [id])
   *
   *   profileId String // This field would be automatically placed here
   *                    // because of the `fields: [...]` section above
   * }
   * ```
   *
   *
   * ```
   * class User {
   *   // Needs a `fields` and a `references`
   *   \@Relation<User, Profile>({ fields: ["profileId"], references: ["id"] })
   *
   *   // You can also use shorthand
   *   \@Relation<Profile>(["id"])
   *
   *   // Don't forget about `Property` :)
   *   \@Property(() => Profile)
   *   profile: Profile;
   * }
   * ```
   *
   *
   */
  autoInsertRelationalFields?: boolean;
  /**
   * Automatically inserts a `@default` attribute on IDs if absent
   * The value for this option should be what goes inside the `@default()` attribute (e.g. `@default(autoincrement())`)
   *
   * **NOTE**: Predefined options (that appear in the intellisense) like `autoincrement`, `uuid` and `dbgenerated` have a pair of brackets `()` appended to them. If your function does not appear in the intellisense, add `()` yourself.
   */
  autoInsertDefaultId?: DefaultAttributeType;
  /**
   * Prettify the generated prisma code.
   * Default: `true`
   */
  prettify?: boolean;
};
