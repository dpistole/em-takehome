import { Account } from "../../../../../../lib/api-sdk/types/entities";
import currency from "currency.js"

interface GetAccountsTotalByTypeParams {
    accountType: string;
    accounts: Account[];
}

export const getAccountsTotalByType = (params: GetAccountsTotalByTypeParams) => {

    const accountsTotal = params.accounts.reduce((acc, account) => {
        // if account type does not match, return accumulator
        if(account.type !== params.accountType) {
            return acc;
        }
        // else add the account balance to the total
        return acc.add(account.balances.current);
    }, currency(0));
    
    return accountsTotal.format();
}