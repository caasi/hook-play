import { useState, useEffect } from "react";

export type Cont<T> = (v: T) => void;
type WithError<T> = [T, unknown | undefined];

/**
 * A hook to extract the value from a callback function. It also handles the
 * error for you.
 * @param f The action to perform with a callback function as an argument.
 * @param defaultValue The default value to use. If not provided, undefined is
 * used and the value will not be reset when f changed or an error occurred. So
 * you can use it to keep the value between f changes.
 * @returns The value and the error.
 */
function useCont<T>(f: Cont<Cont<T>>): WithError<T | undefined>;
function useCont<T>(f: Cont<Cont<T>>, defaultValue: T): WithError<T>;
function useCont<T>(
  f: Cont<Cont<T>>,
  defaultValue?: T
): WithError<T | undefined> {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<unknown | undefined>(undefined);
  useEffect(() => {
    try {
      f((v) => setValue(v));
    } catch (e) {
      if (defaultValue !== undefined) setValue(defaultValue);
      setError(e);
    }
    return () => {
      if (defaultValue !== undefined) setValue(defaultValue);
    };
  }, [f, defaultValue]);
  return [value, error];
}

export default useCont;
