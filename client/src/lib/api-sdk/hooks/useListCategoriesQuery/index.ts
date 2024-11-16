import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "../../constants/ReactQueryKeys";
import { Category } from "../../types/entities";
import { fetchApi, FetchApiParams } from "../../lib/fetchApi";
import { ApiRoutes } from "../../constants/ApiRoutes";

const fetchListCategoriesQuery = async (params: Pick<FetchApiParams, "host">) => fetchApi({
  host: params.host,
  path: ApiRoutes.listCategories.getPath(),
})

interface UseListCategoriesQueryParams {
  host: string;
}

export const useListCategoriesQuery = (params: UseListCategoriesQueryParams) => {
  const listCategoriesQuery = useQuery<Category[]>({
    queryKey: ReactQueryKeys.listCategories.getQueryKey(),
    queryFn: () => fetchListCategoriesQuery({
      host: params.host
    }),
  });

  return listCategoriesQuery; 
};
