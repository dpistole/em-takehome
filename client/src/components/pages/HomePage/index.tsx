import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../constants/AppRoutes";

export const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl">Home Page</h1>
      <div className="flex flex-col space-y-4 py-8">
        <Link to={AppRoutes.Accounts.listAccounts.getPath()}>
          List Accounts
        </Link>
        <Link to={AppRoutes.addSpendTracker.getPath()}>Add Spend Tracker</Link>
        <Link to={AppRoutes.SpendTrackers.listSpendTrackers.getPath()}>
          List Spend Trackers
        </Link>
      </div>
    </div>
  );
};
