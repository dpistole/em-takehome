export const ReactQueryKeys = {
    listAccounts: {
        getQueryKey: () => ["ACCOUNTS"],
    },
    listTransactions: {
        getQueryKey: () => ["TRANSACTIONS"],
    },
    listCategories: {
        getQueryKey: () => ["CATEGORIES"],
    },
    listSpendingTrackers: {
        getQueryKey: () => ["SPENDING_TRACKERS"]
    }
  } as const;
  