import { isSameMonth, isWithinInterval, subDays } from "date-fns";
import { SpendingTracker, Transaction } from "../../api-sdk/types/entities";

interface GetTransactionsForSpendingTrackerParams {
    transactions: Transaction[];
    categoryId: string;
    interval: SpendingTracker["interval"]
}

export const getTransactionsForSpendingTracker = (params: GetTransactionsForSpendingTrackerParams) => {
    const relevantTransactions = params.transactions.filter((transaction) => {
        // if the transaction category is not our target category, filter out (return false)
        if (transaction.category_id !== params.categoryId) {
          return false;
        }
    
        if (
          params.interval === "week" &&
          isWithinInterval(new Date(transaction.date), {
            start: subDays(new Date(), 7),
            end: new Date(),
          })
        ) {
          return true;
        } else if (
          params.interval === "month" &&
          isSameMonth(new Date(transaction.date), new Date())
        ) {
          return true;
        } else {
          return false;
        }
      });

      return relevantTransactions;
}