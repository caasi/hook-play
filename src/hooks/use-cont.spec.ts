import { renderHook, act } from "@testing-library/react";
import type { Cont } from "./use-cont";
import useCont from "./use-cont";

const numberCont = (f: Cont<number>) => setTimeout(f, 0, 42);
const numberCont2 = (f: Cont<number>) => setTimeout(f, 0, 14292);
const errorCont = () => {
  throw new Error("error");
};

describe("useCont", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("without an initial value", () => {
    it("should get an undefined value as the initial value", () => {
      const { result } = renderHook(() => useCont(numberCont));
      const [value, error] = result.current;
      expect(value).toBeUndefined();
      expect(error).toBeUndefined();
    });
    it("should get a value from a continuation", () => {
      const { result, rerender } = renderHook(() => useCont(numberCont));
      act(() => jest.runAllTimers());
      rerender();
      const [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
    });
    it("should keep the last value when the continuation changed", () => {
      const { result, rerender } = renderHook(
        (cont: Cont<Cont<number>> = numberCont) => useCont(cont)
      );
      act(() => jest.runAllTimers());
      rerender(numberCont);
      let [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
      rerender(numberCont2);
      [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
    });
    it("should keep the last value when an error occurred", () => {
      const { result, rerender } = renderHook(
        (cont: Cont<Cont<number>> = numberCont) => useCont(cont)
      );
      act(() => jest.runAllTimers());
      rerender(numberCont);
      let [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
      rerender(errorCont);
      [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeDefined();
    });
    it("should render the new value", () => {
      const { result, rerender } = renderHook(
        (cont: Cont<Cont<number>> = numberCont) => useCont(cont)
      );
      act(() => jest.runAllTimers());
      rerender(numberCont);
      let [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
      rerender(numberCont2);
      [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
      rerender(numberCont2);
      act(() => jest.runAllTimers());
      [value, error] = result.current;
      expect(value).toBe(14292);
      expect(error).toBeUndefined();
    });
  });

  describe("with an initial value", () => {
    it("should get the initial value", () => {
      const { result } = renderHook(() => useCont(numberCont, 0));
      const [value, error] = result.current;
      expect(value).toBe(0);
      expect(error).toBeUndefined();
    });
    it("should get a value from a continuation", () => {
      const { result, rerender } = renderHook(() => useCont(numberCont, 0));
      act(() => jest.runAllTimers());
      rerender();
      const [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
    });
    it("should reset the value when the continuation changed", () => {
      const { result, rerender } = renderHook(
        (cont: Cont<Cont<number>> = numberCont) => useCont(cont, 0)
      );
      act(() => jest.runAllTimers());
      rerender(numberCont);
      let [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
      rerender(numberCont2);
      [value, error] = result.current;
      expect(value).toBe(0);
      expect(error).toBeUndefined();
    });
    it("should reset the value when an error occurred", () => {
      const { result, rerender } = renderHook(
        (cont: Cont<Cont<number>> = numberCont) => useCont(cont, 0)
      );
      act(() => jest.runAllTimers());
      rerender(numberCont);
      let [value, err] = result.current;
      expect(value).toBe(42);
      expect(err).toBeUndefined();
      rerender(errorCont);
      [value, err] = result.current;
      expect(value).toBe(0);
      expect(err).toBeDefined();
    });
    it("should render the new value", () => {
      const { result, rerender } = renderHook(
        (cont: Cont<Cont<number>> = numberCont) => useCont(cont, 0)
      );
      act(() => jest.runAllTimers());
      rerender(numberCont);
      let [value, error] = result.current;
      expect(value).toBe(42);
      expect(error).toBeUndefined();
      rerender(numberCont2);
      [value, error] = result.current;
      expect(value).toBe(0);
      expect(error).toBeUndefined();
      act(() => jest.runAllTimers());
      rerender(numberCont2);
      [value, error] = result.current;
      expect(value).toBe(14292);
      expect(error).toBeUndefined();
    });
  });
});
