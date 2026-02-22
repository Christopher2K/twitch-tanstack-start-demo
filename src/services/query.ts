import { QueryClient } from "@tanstack/react-query";

let queryContext: null | {
  queryClient: QueryClient;
} = null;

export const getQueryContext = () => {
  if (!queryContext) {
    queryContext = { queryClient: new QueryClient() };
  }
  return queryContext;
};
