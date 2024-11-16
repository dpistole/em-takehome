import { createFileRoute } from "@tanstack/react-router";
import { ViewSpendTrackerPage } from "../../../components/pages/spendTrackers/ViewSpendTrackerPage";

export const Route = createFileRoute("/spend-trackers/$spendTrackerId/")({
  component: ViewSpendTrackerPage,
});
