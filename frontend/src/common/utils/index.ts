import type { Dispatch, SetStateAction } from "react";

export const fetchData = async <T>(
  endpoint: string,
  errorCallback: Dispatch<SetStateAction<boolean>>
): Promise<T> => {
  try {
    const response = await fetch("http://localhost:4000" + endpoint);
    if (response.ok) {
      return await response.json();
    }
    throw new Error();
  } catch (e) {
    errorCallback(true);
  }
};

export const filterData = (searchResult: string[], input: string): string[] =>
  searchResult.filter((key) => key.toLowerCase().includes(input.toLowerCase()));

export const lastElement = <T>(array: T[]): T => array[array.length - 1];
