import { useEffect, useState } from "react";
import { UseFetcher, UseFetcherArgs } from "./types";

export function useFetcher(args: UseFetcherArgs): UseFetcher {
  const [data, setData] = useState<any>(null);
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

      setData(response);
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
