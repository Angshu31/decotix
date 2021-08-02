import { _blockAttributeKey, _BlockAttributeMetadata } from "./BlockAttribute";

type T = _BlockAttributeMetadata;

export const ComposeBlockAttribute = <F extends any[]>(
  getStarterData: () => T,
  func: (prev: T, field: string | symbol, ...args: F) => void,
  getKey?: (target: Function, args: any[]) => any
): ((...args: F) => PropertyDecorator) => {
  const created = new Map<any, Function>();
  const allData = new Map<any, T>();

  return (...args) =>
    (target, field) => {
      const C = target.constructor;
      const key = getKey ? getKey(C, args) : C;

      let data = allData.get(key);

      console.log(key);
      if (!created.has(key)) {
        created.set(key, C);
        allData.set(key, (data = getStarterData()));

        const existingMetadata = Reflect.getMetadata(_blockAttributeKey, C);

        Reflect.defineMetadata(
          _blockAttributeKey,
          [...(existingMetadata || []), data],
          C
        );
      }

      func(data, field, ...args);

      console.log(data);
    };
};
