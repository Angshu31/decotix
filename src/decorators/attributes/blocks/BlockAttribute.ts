export const _blockAttributeKey = Symbol("prisma-block-attribute");

export type _BlockAttributeMetadata = {
  str: string;
  extraData?: { type?: string };
};

/** This function is for the block attributes, i.e. the prisma attributes that start with `@@` */
export function BlockAttribute(
  str: string,
  extraData: any = {}
): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(
      _blockAttributeKey,
      [
        ...(Reflect.getMetadata(_blockAttributeKey, target) || []),
        { str, extraData },
      ],
      target
    );
  };
}
