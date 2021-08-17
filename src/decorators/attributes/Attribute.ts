export const _attributeKey = Symbol("prisma-attribute");

export type _AttributeMetadata = {
  field: string;
  str: string;
  extraData?: { type?: string };
};

export function Attribute(str: string, extraData: any = {}): PropertyDecorator {
  console.log({ str, extraData });
  return (target, field) => {
    Reflect.defineMetadata(
      _attributeKey,
      [
        ...(Reflect.getMetadata(_attributeKey, target) || []),
        { field, str, extraData },
      ],
      target
    );
  };
}
