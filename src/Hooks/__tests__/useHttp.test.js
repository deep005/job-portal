import { act } from "react-dom/test-utils";
import useHttp from "../useHttp";
import { renderHook } from "@testing-library/react";

describe("useHttp", () => {
  test("should send a request and return data", async () => {
    const { result } = renderHook(() => useHttp());
    const requestConfig = {
      url: "https://jsonplaceholder.typicode.com/posts/1"
    };
    await act(async () => {
      result.current.sendRequest(requestConfig, data => {
        expect(result.current.isLoading).toBe(false);
        expect(data.title).toEqual("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
      });
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  test("should send a request and return an error", async () => {
    const { result } = renderHook(() => useHttp());
    const requestConfig = {
      url: "https://jsonplaceholder.typicode.com/invalid-url"
    };
    await act(async () => {
      result.current.sendRequest(requestConfig, () => {
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toEqual("Not Found");
      });
    });
  });
});
