import { ethers } from "ethers";
import { DecodePasswordData } from "./decode";

export interface FilterPasswordAttackData
  extends Omit<ethers.providers.TransactionResponse, "data"> {
  data: DecodePasswordData;
}

export type FilterTransactionCallbackType = FilterPasswordAttackData | ethers.providers.TransactionResponse;
