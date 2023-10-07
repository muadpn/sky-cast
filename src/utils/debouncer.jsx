"use client";

const { useState, useEffect } = require("react");

export function useDebounce(value, delay = 600) {
  const [deboucedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
   
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return deboucedValue;
}
