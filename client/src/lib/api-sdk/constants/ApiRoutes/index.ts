export const ApiRoutes = {
  listAccounts: {
    getPath: () => "/accounts",
  },
  listTransactions: {
    getPath: () => "/transactions",
  },
  listCategories: {
    getPath: () => "/categories",
  },
  listSpendingTrackers: {
    getPath: () => "/spending-trackers",
  },
  createSpendingTracker: {
    getPath: () => "/spending-trackers/create"
  },
  updateSpendingTracker: {
    getPath: () => "/spending-trackers/update"
  },
  deleteSpendingTracker: {
    getPath: () => "/spending-trackers/delete",
  }
};
