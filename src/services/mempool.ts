import { ChainId, chainIdToRpc } from "@/utils/rpc";
import { ethers } from "ethers";

class Mempool {
  provider: ethers.providers.WebSocketProvider;

  constructor(chainId: ChainId.LOCALHOST = ChainId.LOCALHOST) {
    this.provider = new ethers.providers.WebSocketProvider(
      chainIdToRpc(chainId).ws
    );
  }

  listen(callback: (data: ethers.providers.TransactionResponse) => any): void {
    const pendingListenerTimes = this.provider.listenerCount("pending");

    if (pendingListenerTimes < 1) {
      this.provider.on("pending", async (hash: string) => {
        console.log(`New pending transaction added to mempool: ${hash}`);
        const transactionData = await this.provider.getTransaction(hash);
        callback(transactionData);
      });
    }
  }
}

export default Mempool;
