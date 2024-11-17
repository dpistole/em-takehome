import { Account } from "../../../../../../lib/api-sdk/types/entities";

export const getAccountsByType = (accounts: Account[]): Record<string,Account[]> => {
    const accountsByType = accounts.reduce(
      (acc: Record<string, Account[]>, account) => {
        const currentAccountType = account.type;
  
        return {
          ...acc,
          [currentAccountType]: [
            account,
            // if the accumulator already has a key for this type, merge existing accounts of same type
            ...(acc[currentAccountType] !== undefined
              ? acc[currentAccountType]
              : []),
          ],
        };
      },
      {}
    );
  
    return accountsByType;
  };