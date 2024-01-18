import { useState, useEffect } from "react";

type Cont<T> = (v: T) => void;

function useCont<T>(f: Cont<Cont<T>>): T | undefined;
function useCont<T>(f: Cont<Cont<T>>, defaultValue: T): T;
function useCont<T>(f: Cont<Cont<T>>, defaultValue?: T): T | undefined {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    f((v) => setValue(v));
    return () => setValue(defaultValue);
  }, [f, defaultValue]);
  return value;
}

export default useCont;
