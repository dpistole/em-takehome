import { createFileRoute } from "@tanstack/react-router";
import { ListAccountsPage } from "../../components/pages/accounts/ListAccountsPage";

export const Route = createFileRoute("/accounts/")({
  component: ListAccountsPage,
});
