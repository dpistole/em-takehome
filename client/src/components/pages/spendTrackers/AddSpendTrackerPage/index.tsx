import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../constants/AppRoutes";

export const AddSpendTrackerPage = () => {
  return (
    <div>
      <div className="text-4xl">Add New Spend Tracker</div>
      <div className="flex flex-col space-y-4 py-8">
        <Link to={AppRoutes.index.getPath()}>Back To Home Page</Link>
      </div>
    </div>
  );
};
