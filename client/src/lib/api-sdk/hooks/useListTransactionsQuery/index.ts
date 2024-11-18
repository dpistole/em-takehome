import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "../../constants/ReactQueryKeys";
import { Transaction } from "../../types/entities";
import { fetchApi, FetchApiParams } from "../../lib/fetchApi";
import { ApiRoutes } from "../../constants/ApiRoutes";

const fetchListTransactionsQuery = async (
  params: Pick<FetchApiParams, "host">
) =>
  fetchApi({
    host: params.host,
    path: ApiRoutes.listTransactions.getPath(),
  });

interface UseListTransactionsQueryParams {
  host: string;
}

export const useListTransactionsQueryQuery = (
  params: UseListTransactionsQueryParams
) => {
  const listTransactionsQuery = useQuery<Transaction[]>({
    queryKey: ReactQueryKeys.listTransactions.getQueryKey(),
    queryFn: () =>
      fetchListTransactionsQuery({
        host: params.host,
      }),
  });

  return listTransactionsQuery;
};
