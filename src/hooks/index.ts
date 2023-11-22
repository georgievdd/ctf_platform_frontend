import { AxiosResponse } from 'axios';
import { useState, useCallback } from 'react';
import { showAlert } from '../datafunc';

export function useInput(init: string) {
  const [value, setValue] = useState(init);
  function onChange(e: any) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  }
}