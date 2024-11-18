import { createFileRoute } from "@tanstack/react-router";
import { AddSpendTrackerPage } from "../../components/pages/spendTrackers/AddSpendTrackerPage";

export const Route = createFileRoute("/add-spend-tracker/")({
  component: AddSpendTrackerPage,
});
