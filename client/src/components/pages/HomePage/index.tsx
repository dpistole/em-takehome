import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../constants/AppRoutes";
import { useListAccountsQuery } from "../../../lib/api-sdk/hooks/useListAccountsQuery";
import { buildTimeVariables } from "../../../buildTimeVariables";
import { useListCategoriesQuery } from "../../../lib/api-sdk/hooks/useListCategoriesQuery";
import { useListSpendingTrackersQuery } from "../../../lib/api-sdk/hooks/useListSpendingTrackersQuery";
import { useListTransactionsQueryQuery } from "../../../lib/api-sdk/hooks/useListTransactionsQuery";
import { AccountsSummary } from "./components/AccountsSummary";
import { Header } from "../../Header";

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
    <div>
      <Header title="Analysis" />
      <div className="flex flex-col space-y-4">
        {listAccountsQuery.isSuccess && (
          <AccountsSummary accounts={listAccountsQuery.data} />
        )}
        <Link to={AppRoutes.addSpendTracker.getPath()}>Add Spend Tracker</Link>
        <Link to={AppRoutes.SpendTrackers.listSpendTrackers.getPath()}>
          List Spend Trackers
        </Link>
      </div>
      <hr />
      <div className="text-3xl">Test Data, Remove</div>
      <div className="text-2xl">Accounts</div>
      <div>
        {listAccountsQuery.isSuccess
          ? listAccountsQuery.data.map((account, index) => (
              <div key={account?.account_id + index}>
                <Link>Account (id: {account?.account_id})</Link>
              </div>
            ))
          : "error fetching accounts"}
      </div>
      <div className="text-2xl">Transactions</div>
      <div>
        {listTransactionsQuery.isSuccess
          ? listTransactionsQuery.data.map((transaction) => (
              <div
                key={
                  transaction.account_id +
                  transaction.category_id +
                  transaction.date
                }
              >
                <Link>Transaction ${transaction.amount}</Link>
              </div>
            ))
          : "error fetching accounts"}
      </div>
      <div className="text-2xl">Categories</div>
      <div>
        {listCategoriesQuery.isSuccess
          ? listCategoriesQuery.data.map((category) => (
              <div key={category.id}>
                {category.name} ({category.id})
              </div>
            ))
          : "error fetching categories"}
      </div>
      <div className="text-2xl">Spending Trackers</div>
      <div>
        {listSpendingTrackersQuery.isSuccess
          ? listSpendingTrackersQuery.data.map((spendingTracker) => (
              <div key={spendingTracker.id}>{spendingTracker.id}</div>
            ))
          : "error fetching spending trackers"}
      </div>
    </div>
  );
};
