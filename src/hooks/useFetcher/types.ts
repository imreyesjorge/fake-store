export interface UseFetcherArgs {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}

export interface UseFetcher {
  data: any;
  isLoading: boolean;
  isError: boolean;
}
