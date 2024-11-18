import currency from "currency.js";
import { Account } from "../../../lib/api-sdk/types/entities";

interface AccountSummaryListItemProps {
  account: Account;
}

export const AccountSummaryListItem = (props: AccountSummaryListItemProps) => {
  return (
    <div className="flex hover:bg-slate-200 py-4 px-8">
      <div className="flex-shrink pr-4">[icon]</div>
      <div className="flex-grow">
        <div>
          <span className="font-bold">{props.account.official_name}</span>
        </div>
        <div>{props.account.name}</div>
      </div>
      <div>{currency(props.account.balances.current).format()}</div>
    </div>
  );
};
