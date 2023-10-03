export interface IUseFetcherArgs {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}

export interface IUseFetcher {
  data: any;
  isLoading: boolean;
  isError: boolean;
}
