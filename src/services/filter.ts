import { ethers } from "ethers";
import { decodePasswordAttackContract } from "@/utils/transaction";
import {
  FilterTransactionCallbackType,
  FilterPasswordAttackData,
} from "@/@types/filter";

const filterTransactionData = (
  transactionData: ethers.providers.TransactionResponse,
  callback: (data: FilterTransactionCallbackType) => void
): void => {
  const decodedData = decodePasswordAttackContract(transactionData.data);
  transactionData;
  if (decodedData.status == true) {
    callback({
      ...transactionData,
      data: decodedData.data,
    } as FilterPasswordAttackData);
  }
};

export { filterTransactionData };
