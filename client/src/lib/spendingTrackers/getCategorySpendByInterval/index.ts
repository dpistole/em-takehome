import currency from "currency.js";
import { SpendingTracker, Transaction } from "../../api-sdk/types/entities";
import { getTransactionsForSpendingTracker } from "../getTransactionsForSpendingTracker";

interface GetCategorySpendByIntervalParams {
  categoryId: string;
  interval: SpendingTracker["interval"];
  transactions: Transaction[];
}
export const getCategorySpendByInterval = (
  params: GetCategorySpendByIntervalParams
) => {
  const relevantTransactions = getTransactionsForSpendingTracker({
    transactions: params.transactions,
    interval: params.interval,
    categoryId: params.categoryId
  })

  let totalCategorySpendForInterval = currency(0);

  for (const rT of relevantTransactions) {
    totalCategorySpendForInterval = totalCategorySpendForInterval.add(
      rT.amount
    );
  }

  return totalCategorySpendForInterval.value;
};
