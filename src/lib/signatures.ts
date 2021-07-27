export const _signatureKey = "__prisma-decorators-signature-key__";

export type _Signature = { type: string; extraData: any };

export const getSignature = (obj: any) =>
  Reflect.getMetadata(_signatureKey, obj) as _Signature;

export const applySignature = (obj: any, type: string, extraData?: any) =>
  Reflect.defineMetadata(_signatureKey, { type, extraData } as _Signature, obj);

// export const getSignature = (obj: any) => obj[_signatureKey] as _Signature;
// export const applySignature = (obj: any, type: string, extraData?: any) =>
//   (obj[_signatureKey] = { type, extraData } as _Signature);
