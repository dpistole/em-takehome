import { buildTimeVariables } from "../../../buildTimeVariables";
import { useListAccountsQuery } from "../../../lib/api-sdk/hooks/useListAccountsQuery";
import { useListCategoriesQuery } from "../../../lib/api-sdk/hooks/useListCategoriesQuery";
import { useListSpendingTrackersQuery } from "../../../lib/api-sdk/hooks/useListSpendingTrackersQuery";
import { useListTransactionsQueryQuery } from "../../../lib/api-sdk/hooks/useListTransactionsQuery";
import { Header } from "../../Header";
import { AccountsSummary } from "./components/AccountsSummary";
import { SpendTrackingSummary } from "./components/SpendTrackingSummary";

export const HomePage = () => {
  const listAccountsQuery = useListAccountsQuery({
    host: buildTimeVariables.apiHost,
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

  return (
    <div data-test-id="home-page">
      <Header title="Analysis" />
      <div className="flex flex-col">
        {listAccountsQuery.isSuccess && (
          <AccountsSummary accounts={listAccountsQuery.data} />
        )}
        {listSpendingTrackersQuery.isSuccess &&
          listCategoriesQuery.isSuccess &&
          listTransactionsQuery.data && (
            <SpendTrackingSummary
              transactions={listTransactionsQuery.data}
              categories={listCategoriesQuery.data}
              spendingTrackers={listSpendingTrackersQuery.data}
            />
          )}
      </div>
    </div>
  );
};
