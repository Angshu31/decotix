export const _directiveKey = Symbol("prisma-directive");

export type _DirectiveMetadata = {
  field: string;
  str: string;
  extraData?: { type?: string };
};

export function Directive(str: string, extraData: any = {}): PropertyDecorator {
  return (target, field) => {
    Reflect.defineMetadata(
      _directiveKey,
      [
        ...(Reflect.getMetadata(_directiveKey, target) || []),
        { field, str, extraData },
      ],
      target
    );
  };
}
