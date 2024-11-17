import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../../constants/AppRoutes";
import { Account } from "../../../../../lib/api-sdk/types/entities";
import { AccountSummaryListItem } from "../../../../accounts/AccountSummaryItem";

interface AccountsSummaryProps {
  accounts: Account[];
  maxSummariesCount?: number;
}

const DEFAULT_MAX_SUMMARIES_COUNT = 5;

export const AccountsSummary = (props: AccountsSummaryProps) => {
  const totalNumberOfAccounts = props.accounts.length;
  const maxSummariesCount: number =
    props.maxSummariesCount ?? DEFAULT_MAX_SUMMARIES_COUNT;
  // we only display a specified number of accounts in the summary
  const summarizedAccounts = props.accounts.slice(0, maxSummariesCount);

  return (
    <div data-test-id="accounts-summary" className="bg-white">
      <div className="flex p-8">
        <div className="flex-grow">
          <Link to={AppRoutes.Accounts.listAccounts.getPath()}>
            <div>
              <span className="font-bold text-2xl">All Accounts</span>
            </div>
            <div>Total: $0</div>
          </Link>
        </div>
        <div className="flex flex-shrink items-center justify-center">
          [add account]
        </div>
      </div>
      <div>
        {summarizedAccounts.map((account) => (
          <div key={`account-${account.account_id}`}>
            <Link
              to={AppRoutes.Accounts.viewAccount.getPath({
                accountId: account.account_id,
              })}
            >
              <AccountSummaryListItem account={account} />
            </Link>
          </div>
        ))}
      </div>
      {totalNumberOfAccounts > maxSummariesCount && (
        <div className="p-8 flex items-center justify-center">
          <Link
            className="w-full"
            to={AppRoutes.Accounts.listAccounts.getPath()}
          >
            <div className="bg-slate-300 rounded-full w-full py-4 px-8 text-center">
              <span className="font-bold">
                View All ({totalNumberOfAccounts})
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
