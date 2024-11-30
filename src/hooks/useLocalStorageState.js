import { useState, useEffect } from "react";

export const useLocalStorageState = (key, defaultValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
