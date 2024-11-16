import { Link } from "@tanstack/react-router";
import { AppRoutes } from "../../../../constants/AppRoutes";

export const ListAccountsPage = () => {
  return (
    <div>
      <div className="text-4xl">List Accounts</div>
      <div className="flex flex-col space-y-4 py-8">
        <Link
          to={AppRoutes.Accounts.viewAccount.getPath({
            accountId: "fake-account-id",
          })}
        >
          To View Account
        </Link>
        <Link to={AppRoutes.index.getPath()}>Back To Home</Link>
      </div>
    </div>
  );
};
