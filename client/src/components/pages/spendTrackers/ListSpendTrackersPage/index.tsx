import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../constants/AppRoutes";
import { Header, HeaderBackLink } from "../../../Header";
import { useListCategoriesQuery } from "../../../../lib/api-sdk/hooks/useListCategoriesQuery";
import { useListSpendingTrackersQuery } from "../../../../lib/api-sdk/hooks/useListSpendingTrackersQuery";
import { useListTransactionsQueryQuery } from "../../../../lib/api-sdk/hooks/useListTransactionsQuery";
import { buildTimeVariables } from "../../../../buildTimeVariables";
import { SpendingTrackingSummaryItem } from "../../../spendingTracker/SpendingTrackerSummaryItem";
import { getCategorySpendByInterval } from "../../../../lib/spendingTrackers/getCategorySpendByInterval";

export const ListSpendTrackersPage = () => {
  const listCategoriesQuery = useListCategoriesQuery({
    host: buildTimeVariables.apiHost,
  });

  const listSpendingTrackersQuery = useListSpendingTrackersQuery({
    host: buildTimeVariables.apiHost,
  });

  const listTransactionsQuery = useListTransactionsQueryQuery({
    host: buildTimeVariables.apiHost,
  });
  return (
    <div>
      <Header
        leftButton={
          <HeaderBackLink label="[home]" to={AppRoutes.index.getPath()} />
        }
        title="Trackers"
        rightButton={
          <Link to={AppRoutes.addSpendTracker.getPath()}>
            <div className="hover:bg-slate-200 w-full h-full px-4 flex items-center justify-center">
              [add]
            </div>
          </Link>
        }
      />
      {listSpendingTrackersQuery.isSuccess &&
        listCategoriesQuery.isSuccess &&
        listTransactionsQuery.data && (
          <div>
            {listSpendingTrackersQuery.data.map((spendingTracker) => {
              const associatedCategory =
                listCategoriesQuery.data.filter(
                  (c) => c.id === spendingTracker.category_id
                )[0] ?? undefined;

              const trackerSpendTotal = getCategorySpendByInterval({
                categoryId: spendingTracker.category_id,
                transactions: listTransactionsQuery.data,
                interval: spendingTracker.interval,
              });

              return (
                <Link
                  key={spendingTracker.id}
                  className="hover:bg-slate-200"
                  to={AppRoutes.SpendTrackers.viewSpendTracker.getPath({
                    spendTrackerId: spendingTracker.id,
                  })}
                >
                  <SpendingTrackingSummaryItem
                    spendingTracker={spendingTracker}
                    category={associatedCategory}
                    totalSpent={trackerSpendTotal}
                  />
                </Link>
              );
            })}
          </div>
        )}
    </div>
  );
};
