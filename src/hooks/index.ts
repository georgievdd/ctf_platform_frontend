import { AxiosResponse } from 'axios';
import { useState, useCallback } from 'react';
import { showAlert } from '../datafunc';

export interface IUseInputValue {
  value: string,
  onChange: (value: any) => void,
  updateValue: (v: string) => void,
} 

export function useInput(init: string): IUseInputValue {
  const [value, setValue] = useState(init);
  function onChange(e: any) {
    setValue(e.target.value);
  }
  function updateValue(value: string) {
    setValue(value);
  }
  return {
    value,
    onChange,
    updateValue,
  }
}