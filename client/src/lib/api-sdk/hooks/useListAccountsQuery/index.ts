import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "../../constants/ReactQueryKeys";
import { Account } from "../../types/entities";
import { fetchApi, FetchApiParams } from "../../lib/fetchApi";
import { ApiRoutes } from "../../constants/ApiRoutes";

const fetchListAccountsQuery = async (params: Pick<FetchApiParams, "host">) => fetchApi({
  host: params.host,
  path: ApiRoutes.listAccounts.getPath()
})

interface UseListAccountsQueryParams {
  host: string;
}

export const useListAccountsQuery = (params: UseListAccountsQueryParams) => {
  // @TODO providing a type  here is virtually a type cast given we don't
  // _really_ know what the API is giving us (we know what is _should_ give us).
  // I've had some success parsing incoming responses with zod (and throwing on
  // unexpected results) 
  const listAccountsQuery = useQuery<Account[]>({
    queryKey: ReactQueryKeys.listAccounts.getQueryKey(),
    queryFn: () => fetchListAccountsQuery({
      host: params.host
    }),
  });

  return listAccountsQuery; 
};
