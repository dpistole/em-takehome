import { useMutation } from "@tanstack/react-query";
import { ApiRoutes } from "../../constants/ApiRoutes";
import { fetchApi, FetchApiParams } from "../../lib/fetchApi";
import { SpendingTracker } from "../../types/entities";

interface UpdateSpendingTrackerData {
  id: string;
  categoryId: string;
  spendLimit: number;
  interval: SpendingTracker["interval"];
}

interface FetchUpdateSpendingTrackerParams {
  data: UpdateSpendingTrackerData;
  host: FetchApiParams["host"];
}

const fetchUpdateSpendingTracker = async (
  params: FetchUpdateSpendingTrackerParams
) =>
  fetchApi({
    host: params.host,
    path: ApiRoutes.updateSpendingTracker.getPath(),
    method: "POST",
    body: JSON.stringify(params.data)
  });

interface UseUpdateSpendingTrackerMutationParams {
  host: string;
}

export const useUpdateSpendingTrackerMutation = (
  params: UseUpdateSpendingTrackerMutationParams
) => {
    
  const updateSpendingTrackerMutation = useMutation({
    mutationFn: (data: UpdateSpendingTrackerData) =>
      fetchUpdateSpendingTracker({
        host: params.host,
        data,
      }),
  });

  return updateSpendingTrackerMutation;
};
