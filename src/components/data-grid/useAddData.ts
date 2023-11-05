import { useState } from "react"

interface IFieldConfig {
  field: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'boolean' | 'number';
}
type FieldValueType = string | number | boolean;

export interface IFieldInit extends IFieldConfig {
  defaultValue: FieldValueType;
}

export interface IUseField extends IFieldConfig {
  value: FieldValueType;
}

export interface IUseObject {
  data: IUseField[],
  onChange: (field: string, value: FieldValueType) => void,
  dto: () => any,
  setInit: () => void,
}

export function useAddData(fields: IFieldInit[]): IUseObject {

  const initValues = fields.map((field): IUseField => ({
    field: field.field,
    name: field.name,
    type: field.type,
    value: field.defaultValue,
  }));

  const [data, setData] = useState(initValues);


  const setInit = () => setData(initValues);

  const onChange = (field: string, value: FieldValueType) => {
    setData(prev => prev.map((v, i) => (
      v.field === field ? {
        ...v,
        value,
      } : v
    )))
  }

  const dto = () => {
    const object = {} as Record<string, FieldValueType>;
    for (const field in fields) {
      object[fields[field].field] = data[field].value;
    }
    return object;
  }

  return {
    data,
    onChange,
    dto,
    setInit,
  };
}