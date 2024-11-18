import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { buildTimeVariables } from "../../../../buildTimeVariables";
import { AppRoutes } from "../../../../constants/AppRoutes";
import { useListCategoriesQuery } from "../../../../lib/api-sdk/hooks/useListCategoriesQuery";
import { useListSpendingTrackersQuery } from "../../../../lib/api-sdk/hooks/useListSpendingTrackersQuery";
import { useUpdateSpendingTrackerMutation } from "../../../../lib/api-sdk/hooks/useUpdateSpendingTrackerMutation";
import { SpendingTracker } from "../../../../lib/api-sdk/types/entities";
import { Route as EditSpendTrackerPageRoute } from "../../../../routes/spend-trackers/$spendTrackerId/edit";
import { Header, HeaderBackLink } from "../../../Header";
import {
  SpendingTrackerForm,
  SpendingTrackerFormValues,
} from "../../../spendingTracker/SpendingTrackerForm";

export const EditSpendTrackerPage = () => {
  const urlParams = EditSpendTrackerPageRoute.useParams();

  const navigate = useNavigate({
    from: AppRoutes.SpendTrackers.editSpendTracker.getPath({
      spendTrackerId: urlParams.spendTrackerId,
    }),
  });

  const listSpendingTrackersQuery = useListSpendingTrackersQuery({
    host: buildTimeVariables.apiHost,
  });

  const listCategoriesQuery = useListCategoriesQuery({
    host: buildTimeVariables.apiHost,
  });

  const updateSpendingTrackerMutation = useUpdateSpendingTrackerMutation({
    host: buildTimeVariables.apiHost,
  });

  const handleSubmit = (values: SpendingTrackerFormValues) => {
    if (currentSpendingTracker !== null) {
      updateSpendingTrackerMutation.mutate({
        id: currentSpendingTracker.id,
        ...values,
      });
      navigate({
        to: AppRoutes.index.getPath(),
      });
    }
  };

  const currentSpendingTracker: null | SpendingTracker = useMemo(() => {
    if (listSpendingTrackersQuery.isSuccess !== true) {
      return null;
    }

    const currentSpendingTracker =
      listSpendingTrackersQuery.data.filter(
        (sT) => sT.id === urlParams.spendTrackerId
      )[0] ?? null;

    return currentSpendingTracker;
  }, [
    listSpendingTrackersQuery.isSuccess,
    listSpendingTrackersQuery.data,
    urlParams.spendTrackerId,
  ]);

  return (
    <div date-test-id="add-spend-tracker-page" className="bg-white">
      <Header
        leftButton={
          <HeaderBackLink to={AppRoutes.index.getPath()} label="[home]" />
        }
        title="Edit Spending Tracker"
      />
      {currentSpendingTracker !== null && listCategoriesQuery.isSuccess && (
        <SpendingTrackerForm
          defaultValues={{
            spendLimit: currentSpendingTracker.spend_limit,
            categoryId: currentSpendingTracker.category_id,
            interval: currentSpendingTracker.interval,
          }}
          onSubmit={handleSubmit}
          categories={listCategoriesQuery.data}
          submitLabel="Update Tracker"
        />
      )}
    </div>
  );
};
