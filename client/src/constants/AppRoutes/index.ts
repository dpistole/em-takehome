export const AppRoutes = {
    index: {
        getPath: () => "/",
    },
    addSpendTracker: {
        getPath: () => "/add-spend-tracker"
    },
    Accounts: {
        listAccounts: {
            getPath: () => "/accounts"
        },
        viewAccount: {
            getPath: (params: {accountId: string}) => `/accounts/${params.accountId}`
        }
    },
    SpendTrackers: {
        listSpendTrackers: {
            getPath: () => "/spend-trackers"
        },
        viewSpendTracker: {
            getPath: (params: {spendTrackerId: string}) => `/spend-trackers/${params.spendTrackerId}`
        },
        editSpendTracker: {
            getPath: (params: {spendTrackerId: string}) => `/spend-trackers/${params.spendTrackerId}/edit`
        },
        changeSpendTrackerCategory: {
            getPath: (params: {spendTrackerId: string}) => `/spend-trackers/${params.spendTrackerId}/edit`
        },
    }
}