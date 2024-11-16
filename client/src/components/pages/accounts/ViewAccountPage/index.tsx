import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../constants/AppRoutes";

export const ViewAccountPage = () => {
  return (
    <div>
      <div className="text-4xl">View Account</div>
      <div className="flex flex-col space-y-4 py-8">
        <Link to={AppRoutes.Accounts.listAccounts.getPath()}>
          Back To List Accounts
        </Link>
      </div>
    </div>
  );
};
