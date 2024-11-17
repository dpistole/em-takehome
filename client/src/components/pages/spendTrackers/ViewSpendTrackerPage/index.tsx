import { Link, useNavigate } from "@tanstack/react-router";
import { AppRoutes } from "../../../../constants/AppRoutes";
import { Route as ViewSpendTrackerRoute } from "../../../../routes/spend-trackers/$spendTrackerId";
import { Header, HeaderBackLink } from "../../../Header";
import { useListCategoriesQuery } from "../../../../lib/api-sdk/hooks/useListCategoriesQuery";
import { useListSpendingTrackersQuery } from "../../../../lib/api-sdk/hooks/useListSpendingTrackersQuery";
import { useListTransactionsQueryQuery } from "../../../../lib/api-sdk/hooks/useListTransactionsQuery";
import { buildTimeVariables } from "../../../../buildTimeVariables";
import { useCallback, useEffect, useMemo } from "react";
import {
  Category,
  SpendingTracker,
  Transaction,
} from "../../../../lib/api-sdk/types/entities";
import { getCategorySpendByInterval } from "../../../../lib/spendingTrackers/getCategorySpendByInterval";
import currency from "currency.js";
import { TransactionsList } from "../../../transactions/TransactionsList";
import { getTransactionsForSpendingTracker } from "../../../../lib/spendingTrackers/getTransactionsForSpendingTracker";
import { SpendingTrackerProgressBar } from "../../../spendingTracker/SpendingTrackerProgressBar";
import { useDeleteSpendingTrackerMutation } from "../../../../lib/api-sdk/hooks/useDeleteSpendingTrackerMutation";

export const ViewSpendTrackerPage = () => {
  const routeParams = ViewSpendTrackerRoute.useParams();
  const navigate = useNavigate({
    from: AppRoutes.SpendTrackers.viewSpendTracker.getPath({
      spendTrackerId: routeParams.spendTrackerId,
    }),
  });

  const listCategoriesQuery = useListCategoriesQuery({
    host: buildTimeVariables.apiHost,
  });

  const listSpendingTrackersQuery = useListSpendingTrackersQuery({
    host: buildTimeVariables.apiHost,
  });

  const listTransactionsQuery = useListTransactionsQueryQuery({
    host: buildTimeVariables.apiHost,
  });

  const deleteSpendingTrackerMutation = useDeleteSpendingTrackerMutation({
    host: buildTimeVariables.apiHost,
  });

  const currentSpendingTracker: null | SpendingTracker = useMemo(() => {
    // if any of the queries failed, assign null (we need them all for the UI)
    if (
      listSpendingTrackersQuery.isSuccess === false ||
      listCategoriesQuery.isSuccess === false ||
      listTransactionsQuery.isSuccess === false
    ) {
      return null;
    }

    const result = listSpendingTrackersQuery.data.filter(
      (sT) => sT.id === routeParams.spendTrackerId
    );

    return result[0] ?? null;
  }, [
    listSpendingTrackersQuery.isSuccess,
    listCategoriesQuery.isSuccess,
    listTransactionsQuery.isSuccess,
    listSpendingTrackersQuery.data,
    routeParams.spendTrackerId,
  ]);

  const associatedCategory: null | Category = useMemo(() => {
    if (currentSpendingTracker !== null && listCategoriesQuery.isSuccess) {
      return (
        listCategoriesQuery.data.filter(
          (c) => c.id === currentSpendingTracker.category_id
        )[0] ?? null
      );
    }

    return null;
  }, [
    currentSpendingTracker,
    listCategoriesQuery.isSuccess,
    listCategoriesQuery.data,
  ]);

  const currentSpendTotal = useMemo(() => {
    if (
      currentSpendingTracker === null ||
      associatedCategory === null ||
      listTransactionsQuery.isSuccess !== true
    ) {
      return 0;
    }

    return getCategorySpendByInterval({
      categoryId: currentSpendingTracker.category_id,
      transactions: listTransactionsQuery.data,
      interval: currentSpendingTracker.interval,
    });
  }, [
    associatedCategory,
    currentSpendingTracker,
    listTransactionsQuery.data,
    listTransactionsQuery.isSuccess,
  ]);

  const associatedTransactions: Transaction[] = useMemo(() => {
    if (
      currentSpendingTracker !== null &&
      associatedCategory !== null &&
      listTransactionsQuery.isSuccess
    ) {
      const transactions = getTransactionsForSpendingTracker({
        interval: currentSpendingTracker.interval,
        categoryId: associatedCategory?.id,
        transactions: listTransactionsQuery.data,
      });

      return transactions;
    }

    return [];
  }, [
    currentSpendingTracker,
    associatedCategory,
    listTransactionsQuery.isSuccess,
    listTransactionsQuery.data,
  ]);

  const handleDelete = useCallback(() => {
    if (currentSpendingTracker !== null) {
      deleteSpendingTrackerMutation.mutate({
        spendingTrackerId: currentSpendingTracker?.id,
      });
    }
  }, [currentSpendingTracker, deleteSpendingTrackerMutation]);

  // if the spending tracker is delete, navigate the user to the home page
  useEffect(() => {
    if (deleteSpendingTrackerMutation.isSuccess) {
      navigate({
        to: AppRoutes.index.getPath(),
      });
    }
  }, [deleteSpendingTrackerMutation.isSuccess, navigate]);

  return (
    <div data-test-id="view-spending-tracker-page" className="bg-white">
      <Header
        leftButton={
          <HeaderBackLink label="[home]" to={AppRoutes.index.getPath()} />
        }
      />
      {currentSpendingTracker !== null && associatedCategory !== null && (
        <div>
          <div className="flex items-center justify-center p-4">
            <span className="text-4xl">[big icon]</span>
          </div>
          <div className="flex items-center justify-center p-2">
            <span className="text-3xl font-bold">
              {associatedCategory.name}
            </span>
          </div>
          <div className="flex items-center justify-center p-2">
            <span className="text-lg text-neutral-700">
              {currentSpendingTracker.interval === "week" && "Every Week"}
              {currentSpendingTracker.interval === "month" && "Every Month"}
            </span>
          </div>
          <div className="flex items-center justify-center p-4">
            <Link
              to={AppRoutes.SpendTrackers.editSpendTracker.getPath({
                spendTrackerId: currentSpendingTracker.id,
              })}
            >
              <div className=" hover:bg-slate-200 p-4">
                <span className="text-xl">[Edit]</span>
              </div>
            </Link>

            <div className=" hover:bg-slate-200 p-4">
              <button
                disabled={currentSpendingTracker === null}
                onClick={() => {
                  handleDelete();
                }}
              >
                <span className="text-xl">[Delete]</span>
              </button>
            </div>
          </div>
          <div className="px-8 py-2 flex items-center justify-start">
            {`${currency(currentSpendTotal).format()} of ${currency(currentSpendingTracker.spend_limit).format()}`}
          </div>
          <SpendingTrackerProgressBar
            spendLimit={currentSpendingTracker.spend_limit}
            totalSpent={currentSpendTotal}
          />
          <TransactionsList transactions={associatedTransactions} />
        </div>
      )}
    </div>
  );
};
