import { buildTimeVariables } from "../../../../buildTimeVariables";
import { AppRoutes } from "../../../../constants/AppRoutes";
import { useListCategoriesQuery } from "../../../../lib/api-sdk/hooks/useListCategoriesQuery";
import { Header, HeaderBackLink } from "../../../Header";
import { useCreateNewSpendTrackerMutation } from "../../../../lib/api-sdk/hooks/useCreateNewSpendTrackerMutation";
import { useNavigate } from "@tanstack/react-router";
import {
  SpendingTrackerForm,
  SpendingTrackerFormValues,
} from "../../../spendingTracker/SpendingTrackerForm";

export const AddSpendTrackerPage = () => {
  const navigate = useNavigate({
    from: AppRoutes.addSpendTracker.getPath(),
  });

  const listCategoriesQuery = useListCategoriesQuery({
    host: buildTimeVariables.apiHost,
  });

  const createNewSpendTrackerMutation = useCreateNewSpendTrackerMutation({
    host: buildTimeVariables.apiHost,
  });

  const handleSubmit = (values: SpendingTrackerFormValues) => {
    createNewSpendTrackerMutation.mutate(values);
    navigate({
      to: AppRoutes.index.getPath(),
    });
  };

  return (
    <div date-test-id="add-spend-tracker-page" className="bg-white">
      <Header
        leftButton={
          <HeaderBackLink to={AppRoutes.index.getPath()} label="[home]" />
        }
        title="Track Spending"
      />
      {listCategoriesQuery.isSuccess && (
        <SpendingTrackerForm
          onSubmit={handleSubmit}
          categories={listCategoriesQuery.data}
          submitLabel="Add Tracker"
        />
      )}
    </div>
  );
};
