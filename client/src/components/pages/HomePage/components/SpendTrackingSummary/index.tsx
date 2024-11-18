import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../../constants/AppRoutes";
import { SectionHeader } from "../../../../SectionHeader";
import {
  Category,
  SpendingTracker,
  Transaction,
} from "../../../../../lib/api-sdk/types/entities";
import { getCategorySpendByInterval } from "../../../../../lib/spendingTrackers/getCategorySpendByInterval";
import { SpendingTrackingSummaryItem } from "../../../../spendingTracker/SpendingTrackerSummaryItem";

interface SpendTrackingSummaryProps {
  spendingTrackers: SpendingTracker[];
  categories: Category[];
  transactions: Transaction[];
}

export const SpendTrackingSummary = (props: SpendTrackingSummaryProps) => {
  return (
    <div data-test-id="spend-tracking-summary" className="bg-white">
      {/* Header */}
      <div className="flex pt-8 pb-4">
        <div className="flex-grow hover:bg-slate-200">
          <Link
            className="h-full w-full flex items-center justify-start px-8"
            to={AppRoutes.SpendTrackers.listSpendTrackers.getPath()}
          >
            <SectionHeader label="Trackers" />
          </Link>
        </div>
        <div className="flex-shrink p-4 flex items-center hover:bg-slate-200">
          <Link
            className="h-full w-full flex items-center justify-start"
            to={AppRoutes.addSpendTracker.getPath()}
          >
            [ add tracker ]
          </Link>
        </div>
      </div>
      {/* Summaries List */}
      <div>
        {props.spendingTrackers.map((spendingTracker) => {
          const associatedCategory =
            props.categories.filter(
              (c) => c.id === spendingTracker.category_id
            )[0] ?? undefined;

          const trackerSpendTotal = getCategorySpendByInterval({
            categoryId: spendingTracker.category_id,
            transactions: props.transactions,
            interval: spendingTracker.interval,
          });

          return (
            <div key={spendingTracker.id}>
              <Link
                to={AppRoutes.SpendTrackers.viewSpendTracker.getPath({
                  spendTrackerId: spendingTracker.id,
                })}
              >
                <SpendingTrackingSummaryItem
                  spendingTracker={spendingTracker}
                  totalSpent={trackerSpendTotal}
                  category={associatedCategory}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
