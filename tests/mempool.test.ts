import {
  FilterTransactionCallbackType,
  filterTransactionData,
} from "@/services/filter";
import { ethers } from "ethers";
import Mempool from "@/services/mempool";

describe("Mempool", () => {
  it("Read Log", async () => {
    const mempool = new Mempool();

    mempool.listen((data: ethers.providers.TransactionResponse) => {
      filterTransactionData(data, (data: FilterTransactionCallbackType) => {
        console.log(data);
      });
    });
  });
});
