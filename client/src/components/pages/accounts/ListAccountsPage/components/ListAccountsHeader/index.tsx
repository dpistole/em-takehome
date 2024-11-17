import { AppRoutes } from "../../../../../../constants/AppRoutes";
import { Header, HeaderBackLink } from "../../../../../Header";

export const ListAccountsHeader = () => {
  return (
    <Header
      leftButton={
        <HeaderBackLink label="[home]" to={AppRoutes.index.getPath()} />
      }
      title="Accounts"
      rightButton={
        <a href={"https://www.google.com/search?q=how+to+integrate+with+plaid"}>
          <div className="hover:bg-slate-200 w-full h-full px-4 flex items-center justify-center">
            [icon]
          </div>
        </a>
      }
    />
  );
};
