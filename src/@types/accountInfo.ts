export interface AccountInfoItem {
  address: string;
  balances: string[]; // balances[0] will be before balance, balances[1] will be after balance
}
