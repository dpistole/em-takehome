export interface AccountBalances {
  available: number;
  current: number;
  iso_currency_code: "USD";
}

export interface Account {
  account_id: string;
  balances: AccountBalances;
  name: string;
  official_name: string;
  subtype: string;
  type: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Transaction {
  account_id: string;
  amount: number;
  iso_currency_code: "USD";
  category_id: string;
  date: string;
  merchant_name: string;
  merchant_id: string;
  logo_url: string;
  website: string;
  payment_channel: string;
  pending: boolean;
}

export interface SpendingTracker {
  id: string;
  spend_limit: number;
  category_id: string;
  interval: "week" | "month";
}