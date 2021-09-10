export type BlockAttributeData = {
  name: string;
  fields: string[];
};

export type PropertyAttributeData = {
  name: string;
  args?: (string | object)[];
  noArgEncode?: boolean;
};

export type PropertyData = {
  name: string;
  type: string;
  nullable: boolean;
  attributes: PropertyAttributeData[];
};

export type ModelData = {
  name: string;
  blockAttributes: BlockAttributeData[];
  properties: Map<string, PropertyData>;
};
