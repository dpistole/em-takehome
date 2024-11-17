import { AppRoutes } from "../../../../constants/AppRoutes";
import { Header, HeaderBackLink } from "../../../Header";
import { Route as ViewAccountRoute } from "../../../../routes/accounts/$accountId";
import { useListAccountsQuery } from "../../../../lib/api-sdk/hooks/useListAccountsQuery";
import { buildTimeVariables } from "../../../../buildTimeVariables";
import { useMemo } from "react";
import { useListTransactionsQueryQuery } from "../../../../lib/api-sdk/hooks/useListTransactionsQuery";
import { Account, Transaction } from "../../../../lib/api-sdk/types/entities";
import { format, isSameYear } from "date-fns";
import currency from "currency.js";
import classNames from "classnames";

export const ViewAccountPage = () => {
  const routeParams = ViewAccountRoute.useParams();

  const listAccountsQuery = useListAccountsQuery({
    host: buildTimeVariables.apiHost,
  });
  const listTransactionsQuery = useListTransactionsQueryQuery({
    host: buildTimeVariables.apiHost,
  });

  const currentAccount: null | Account = useMemo(() => {
    if (listAccountsQuery.isSuccess) {
      const filterResult = listAccountsQuery.data.filter(
        (account) => account.account_id === routeParams.accountId
      );
      return filterResult[0] ?? null;
    }

    return null;
  }, [routeParams, listAccountsQuery.data, listAccountsQuery.isSuccess]);

  const currentTransactions: Transaction[] = useMemo(() => {
    if (listTransactionsQuery.isSuccess === true) {
      return listTransactionsQuery.data.filter(
        (t) => t.account_id === routeParams.accountId
      );
    }
    return [];
  }, [
    listTransactionsQuery.isSuccess,
    listTransactionsQuery.data,
    routeParams.accountId,
  ]);

  return (
    <div data-test-id="view-account-page" className="bg-white">
      <Header
        leftButton={
          <HeaderBackLink
            label="[back]"
            to={AppRoutes.Accounts.listAccounts.getPath()}
          />
        }
      />
      {currentAccount !== null && (
        <div>
          <div className="flex items-center justify-center text-4xl p-4">
            [big icon]
          </div>
          <div className="text-center py-4">
            <span className="text-3xl font-bold p-8">
              {currentAccount.official_name}
            </span>
          </div>
          <div className="text-center py-4">{currentAccount.name}</div>
          <div className="text-center pt-4 pb-48">
            <div>
              <div className="font-bold text-3xl">
                {currency(currentAccount.balances.current).format()}
              </div>
              <div className="italic py-2">
                ({currency(currentAccount.balances.available).format()}{" "}
                available)
              </div>
            </div>
          </div>
          <div>
            <div className="px-8">
              <div className="h-16 flex items-center justify-start">
                <span className="font-bold text-xl">Transactions</span>
              </div>
            </div>
            <div className="px-8">
              {currentTransactions.map((transaction) => {
                const transactionDate = new Date(transaction.date);
                const isCredit = transaction.amount > 0;
                const isDebit = transaction.amount < 0;

                return (
                  <div
                    key={new Date(transaction.date).getDate()}
                    className="flex py-4"
                  >
                    <div className=" flex-shrink flex items-center justify-center p-4">
                      [icon]
                    </div>
                    <div className="flex-grow">
                      <div>
                        <span className="font-bold">
                          {transaction.merchant_name}
                        </span>
                      </div>
                      <div>
                        {format(transactionDate, "MMM d")}
                        {isSameYear(transactionDate, new Date()) === true
                          ? null
                          : ", " + format(transactionDate, "yyyy")}
                      </div>
                    </div>
                    <div
                      className={classNames([
                        "text-xl",
                        "flex-shrink",
                        {
                          "text-green-500": isCredit,
                          "text-red-500": isDebit,
                        },
                      ])}
                    >
                      {isCredit && "+"}
                      {isDebit && "-"}
                      {currency(transaction.amount).format()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
