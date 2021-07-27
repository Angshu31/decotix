import { DefaultDirectiveType } from "../decorators/directives/Default";

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
   * Automatically adds the id field of a relation
   *
   * @example
   
  ```prisma
  model User {
    // ...
    profile   Profile \@relation(fields: [profileId], references: [id])
  
    // This `profileId` is auto-generated because of the `fields: [profileId]` above in the relation
    profileId String
  }
  ```
   */
  autoInsertRelationalFields?: boolean;
  /**
   * Automatically inserts a `@default` directive on IDs if absent
   * The value for this option should be what goes inside the `@default()` directive (e.g. `@default(autoincrement())`)
   *
   * NOTE: `()` is not always added to your value by default. Only `autoincrement` and `uuid` are changed to `autoincrement()` and `uuid()`.
   * ***This means that `someOtherPrismaFunction` will not be converted to `someOtherPrismaFunction()`***
   */
  autoInsertDefaultId?: DefaultDirectiveType;
  /**
   * Prettify the generated prisma code
   */
  prettify?: boolean;
};
