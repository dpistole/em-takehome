import { createFileRoute } from "@tanstack/react-router";
import { EditSpendTrackerPage } from "../../../../components/pages/spendTrackers/EditSpendTrackerPage";

export const Route = createFileRoute("/spend-trackers/$spendTrackerId/edit/")({
  component: EditSpendTrackerPage,
});
