import { useEffect, useState } from "react";
import { IUseFetcher, IUseFetcherArgs } from "./types";

export function useFetcher<T>(args: IUseFetcherArgs): IUseFetcher<T> {
  const [data, setData] = useState<T>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const asyncFetch = async () => {
    setIsLoading(true);

    try {
      const rawResponse = await fetch(args.url, {
        method: args.method || "GET",
        body: args.body,
      });

      const response = await rawResponse.json();

      const mappedResponse = response.map((item) => ({
        ...item,
        key: crypto.randomUUID(),
      }));

      setData(mappedResponse);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return { data, isLoading, isError };
}
