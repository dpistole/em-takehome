import currency from "currency.js";
import { Category, SpendingTracker } from "../../../lib/api-sdk/types/entities";
import { SpendingTrackerProgressBar } from "../SpendingTrackerProgressBar";

interface SpendingTrackerSummaryItemProps {
  spendingTracker: SpendingTracker;
  category: Category;
  totalSpent: number;
}

export const SpendingTrackingSummaryItem = (
  props: SpendingTrackerSummaryItemProps
) => {
  return (
    <div className="py-4 bg-white hover:bg-slate-200">
      <div className="flex p-4">
        <div className="flex-shrink p-4 flex items-center justify-center">
          [icon]
        </div>
        <div className="flex-grow">
          <div>
            <span className="font-bold text-lg">{props.category.name}</span>
          </div>
          <div>
            {props.spendingTracker.interval === "week" && "Every Week"}
            {props.spendingTracker.interval === "month" && "Every Month"}
          </div>
        </div>
        <div className="flex-shrink px-4">
          <div className="text-right">
            {currency(props.totalSpent).format()}
          </div>
          <div className="text-right">
            of {currency(props.spendingTracker.spend_limit).format()}
          </div>
        </div>
      </div>
      <div className="py-">
        <SpendingTrackerProgressBar
          spendLimit={props.spendingTracker.spend_limit}
          totalSpent={props.totalSpent}
          size="sm"
        />
      </div>
    </div>
  );
};
