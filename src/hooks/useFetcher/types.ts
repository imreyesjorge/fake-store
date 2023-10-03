export interface IUseFetcherArgs {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}

export interface IUseFetcher<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}
