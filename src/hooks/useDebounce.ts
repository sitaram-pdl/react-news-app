import { useEffect, useState } from 'react';

/**
 * Debounces a value over time.
 * @template T - The type of the value to debounce.
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {T} The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
