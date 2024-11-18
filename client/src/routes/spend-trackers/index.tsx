import { createFileRoute } from "@tanstack/react-router";
import { ListSpendTrackersPage } from "../../components/pages/spendTrackers/ListSpendTrackersPage";

export const Route = createFileRoute("/spend-trackers/")({
  component: ListSpendTrackersPage,
});
