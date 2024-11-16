import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../constants/AppRoutes";
import { Route as ViewSpendTrackerRoute } from "../../../../routes/spend-trackers/$spendTrackerId";

export const ViewSpendTrackerPage = () => {
  const routeParams = ViewSpendTrackerRoute.useParams();

  return (
    <div>
      <div className="text-4xl">
        View Spend Tracker ({routeParams.spendTrackerId})
      </div>
      <div className="flex flex-col space-y-4 py-8">
        <Link
          to={AppRoutes.SpendTrackers.editSpendTracker.getPath({
            spendTrackerId: routeParams.spendTrackerId,
          })}
        >
          Edit Spend Tracker ({routeParams.spendTrackerId})
        </Link>
        <Link to={AppRoutes.SpendTrackers.listSpendTrackers.getPath()}>
          Back To Spend Trackers List
        </Link>
      </div>
    </div>
  );
};
