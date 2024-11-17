import { useMutation } from "@tanstack/react-query";
import { ApiRoutes } from "../../constants/ApiRoutes";
import { fetchApi, FetchApiParams } from "../../lib/fetchApi";
import { SpendingTracker } from "../../types/entities";

interface NewSpendTrackerData {
  categoryId: string;
  spendLimit: number;
  interval: SpendingTracker["interval"];
}

interface FetchCreateNewSpendTrackerParams {
  data: NewSpendTrackerData;
  host: FetchApiParams["host"];
}

const fetchCreateNewSpendTracker = async (
  params: FetchCreateNewSpendTrackerParams
) =>
  fetchApi({
    host: params.host,
    path: ApiRoutes.createSpendingTracker.getPath(),
    method: "POST",
    body: JSON.stringify(params.data)
  });

interface UseCreateNewSpendTrackerMutationParams {
  host: string;
}

export const useCreateNewSpendTrackerMutation = (
  params: UseCreateNewSpendTrackerMutationParams
) => {
    
  const createNewSpendTrackerMutation = useMutation({
    mutationFn: (data: NewSpendTrackerData) =>
      fetchCreateNewSpendTracker({
        host: params.host,
        data,
      }),
  });

  return createNewSpendTrackerMutation;
};
