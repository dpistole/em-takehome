import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../constants/AppRoutes";

export const ListSpendTrackersPage = () => {
  return (
    <div>
      <div className="text-4xl">List Spend Trackers</div>
      <div className="flex flex-col space-y-4 py-8">
        <Link
          to={AppRoutes.SpendTrackers.viewSpendTracker.getPath({
            spendTrackerId: "fake-spend-tracker-id",
          })}
        >
          Spend Tracker ("fake-spend-tracker-id")
        </Link>
        <Link to={AppRoutes.index.getPath()}>Back To Home Page</Link>
      </div>
    </div>
  );
};
