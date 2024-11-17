import { useListAccountsQuery } from "../../../../lib/api-sdk/hooks/useListAccountsQuery";
import { buildTimeVariables } from "../../../../buildTimeVariables";
import { AccountSummaryListItem } from "../../../accounts/AccountSummaryItem";
import { getAccountsByType } from "./lib/getAccountsByType";
import { getAccountsTotalByType } from "./lib/getAccountsTotalByType";
import { AppRoutes } from "../../../../constants/AppRoutes";
import { Link } from "@tanstack/react-router";
import { ListAccountsHeader } from "./components/ListAccountsHeader";

export const ListAccountsPage = () => {
  const listAccountsQuery = useListAccountsQuery({
    host: buildTimeVariables.apiHost,
  });

  const accountsByType = listAccountsQuery.isSuccess
    ? getAccountsByType(listAccountsQuery.data)
    : {};

  return (
    <div className="bg-white">
      <ListAccountsHeader />
      {listAccountsQuery.isSuccess &&
        Object.keys(accountsByType).map((accountType) => (
          <div key={accountType}>
            <div className="p-8 flex">
              <div className="flex-grow flex justify-start items-center">
                <span className="font-bold">{accountType}</span>
              </div>
              <div className="flex-shrink px-8">
                {getAccountsTotalByType({
                  accounts: listAccountsQuery.data,
                  accountType,
                })}
              </div>
            </div>
            <div>
              {accountsByType[accountType].map((account) => (
                <Link
                  key={account.account_id}
                  to={AppRoutes.Accounts.viewAccount.getPath({
                    accountId: account.account_id,
                  })}
                >
                  <AccountSummaryListItem account={account} />
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
