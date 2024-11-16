import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../constants/AppRoutes";
import { Route as EditSpendTrackerPageRoute } from "../../../../routes/spend-trackers/$spendTrackerId/edit";

export const EditSpendTrackerPage = () => {
  const urlParams = EditSpendTrackerPageRoute.useParams();

  return (
    <div>
      <div className="text-4xl">Edit Spend Tracker</div>
      <div className="flex flex-col space-y-4 py-8">
        <Link
          to={AppRoutes.SpendTrackers.viewSpendTracker.getPath({
            spendTrackerId: urlParams.spendTrackerId,
          })}
        >
          Back To View Spend Tracker ({urlParams.spendTrackerId})
        </Link>
      </div>
    </div>
  );
};
