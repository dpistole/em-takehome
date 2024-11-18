import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "../../constants/ReactQueryKeys";
import { SpendingTracker } from "../../types/entities";
import { fetchApi, FetchApiParams } from "../../lib/fetchApi";
import { ApiRoutes } from "../../constants/ApiRoutes";

const fetchListSpendingTrackersQuery = async (params: Pick<FetchApiParams, "host">) => fetchApi({
  host: params.host,
  path: ApiRoutes.listSpendingTrackers.getPath()
})

interface UseListSpendingTrackersQueryParams {
  host: string;
}

export const useListSpendingTrackersQuery = (params: UseListSpendingTrackersQueryParams) => {
  const listSpendingTrackersQuery = useQuery<SpendingTracker[]>({
    queryKey: ReactQueryKeys.listSpendingTrackers.getQueryKey(),
    queryFn: () => fetchListSpendingTrackersQuery({
      host: params.host
    }),
  });

  return listSpendingTrackersQuery; 
};
