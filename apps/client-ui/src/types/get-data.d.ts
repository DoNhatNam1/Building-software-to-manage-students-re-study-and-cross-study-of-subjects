

export type GenericSchemaType<T> = {
  id: string;
  [key: string]: T;
};

export type getMonHocSchemaType = GenericSchemaType<string>;
export type getGiangVienSchemaType = GenericSchemaType<string>;
export type getPhongHocSchemaType = GenericSchemaType<string>;