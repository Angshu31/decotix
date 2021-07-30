import { _blockAttributeKey, _BlockAttributeMetadata } from "./BlockAttribute";

type T = _BlockAttributeMetadata;

export const ComposeBlockAttribute = (
  getStarterData: () => T,
  func: (prev: T, field: string | symbol) => void
): (() => PropertyDecorator) => {
  let isCreated: boolean = false,
    data: T;

  return () => (target, field) => {
    if (!isCreated) {
      isCreated = true;
      data = getStarterData();
      Reflect.defineMetadata(
        _blockAttributeKey,
        [...(Reflect.getMetadata(_blockAttributeKey, target) || []), data],
        target.constructor
      );
    }

    func(data, field);
  };
};
