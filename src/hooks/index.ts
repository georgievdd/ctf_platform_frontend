import { useState, useCallback } from 'react';

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