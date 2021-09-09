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
   * Prettify the generated prisma code.
   * Default: `true`
   */
  prettify?: boolean;
};
