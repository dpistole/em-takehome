import { createFileRoute } from "@tanstack/react-router";
import { ViewAccountPage } from "../../../components/pages/accounts/ViewAccountPage";

export const Route = createFileRoute("/accounts/$accountId/")({
  component: ViewAccountPage,
});
