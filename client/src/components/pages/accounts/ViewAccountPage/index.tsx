import { AppRoutes } from "../../../../constants/AppRoutes";
import { Header, HeaderBackLink } from "../../../Header";
import { Route as ViewAccountRoute } from "../../../../routes/accounts/$accountId";
import { useListAccountsQuery } from "../../../../lib/api-sdk/hooks/useListAccountsQuery";
import { buildTimeVariables } from "../../../../buildTimeVariables";
import { useMemo } from "react";
import currencyjs from "currency.js";

export const ViewAccountPage = () => {
  const routeParams = ViewAccountRoute.useParams();

  const listAccountsQuery = useListAccountsQuery({
    host: buildTimeVariables.apiHost,
  });

  const currentAccount = useMemo(() => {
    if (listAccountsQuery.isSuccess) {
      const filterResult = listAccountsQuery.data.filter(
        (account) => account.account_id === routeParams.accountId
      );
      return filterResult[0] ?? null;
    }

    return null;
  }, [routeParams, listAccountsQuery.data, listAccountsQuery.isSuccess]);

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
          <div className="text-center py-4">
            <div>
              <div className="font-bold text-3xl">
                {currencyjs(currentAccount.balances.current).format()}
              </div>
              <div className="italic py-2">
                ({currencyjs(currentAccount.balances.available).format()}{" "}
                available)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
