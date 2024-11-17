import { format, isSameYear } from "date-fns";
import { Transaction } from "../../../lib/api-sdk/types/entities";
import classNames from "classnames";
import currency from "currency.js";

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList = (props: TransactionsListProps) => {
  return (
    <div>
      <div className="px-8">
        <div className="h-16 flex items-center justify-start">
          <span className="font-bold text-xl">Transactions</span>
        </div>
      </div>
      <div className="px-8">
        {props.transactions.map((transaction) => {
          const transactionDate = new Date(transaction.date);
          const isCredit = transaction.amount > 0;
          const isDebit = transaction.amount < 0;

          return (
            <div
              key={new Date(transaction.date).getDate()}
              className="flex py-4"
            >
              <div className=" flex-shrink flex items-center justify-center p-4">
                [icon]
              </div>
              <div className="flex-grow">
                <div>
                  <span className="font-bold">{transaction.merchant_name}</span>
                </div>
                <div>
                  {format(transactionDate, "MMM d")}
                  {isSameYear(transactionDate, new Date()) === true
                    ? null
                    : ", " + format(transactionDate, "yyyy")}
                </div>
              </div>
              <div
                className={classNames([
                  "text-xl",
                  "flex-shrink",
                  {
                    "text-green-500": isCredit,
                    "text-red-500": isDebit,
                  },
                ])}
              >
                {isCredit && "+"}
                {isDebit && "-"}
                {currency(transaction.amount).format()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
