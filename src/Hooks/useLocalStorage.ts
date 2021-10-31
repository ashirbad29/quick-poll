import { useState } from 'react';

/** use to store and retrive values for localstorage */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err: any) {
      throw new Error(err.message);
    }
  });

  /**
   * @description setter method for useLocalStorage.
   * @param {T | (val: T) => T} value - The value to be set
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
