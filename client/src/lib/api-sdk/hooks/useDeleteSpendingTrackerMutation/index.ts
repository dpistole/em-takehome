import { useMutation } from "@tanstack/react-query";
import { ApiRoutes } from "../../constants/ApiRoutes";
import { fetchApi, FetchApiParams } from "../../lib/fetchApi";

interface FetchDeleteSpendingTrackerParams {
  data: {
    spendingTrackerId: string;
  };
  host: FetchApiParams["host"];
}

const fetchDeleteSpendingTracker = async (
  params: FetchDeleteSpendingTrackerParams
) =>
  fetchApi({
    host: params.host,
    path: ApiRoutes.deleteSpendingTracker.getPath(),
    method: "POST",
    body: JSON.stringify(params.data),
  });

interface UseDeleteSpendingTrackerMutationParams {
  host: string;
}

export const useDeleteSpendingTrackerMutation = (
  params: UseDeleteSpendingTrackerMutationParams
) => {
  const createNewSpendTrackerMutation = useMutation({
    mutationFn: (data: FetchDeleteSpendingTrackerParams["data"]) =>
      fetchDeleteSpendingTracker({
        host: params.host,
        data,
      }),
  });

  return createNewSpendTrackerMutation;
};
