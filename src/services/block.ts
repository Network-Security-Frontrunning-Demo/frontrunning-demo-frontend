import { ChainId, chainIdToRpc } from "@/utils/rpc";
import { ethers } from "ethers";

class Block {
  provider: ethers.providers.WebSocketProvider;

  constructor(chainId: ChainId.LOCALHOST = ChainId.LOCALHOST) {
    this.provider = new ethers.providers.WebSocketProvider(
      chainIdToRpc(chainId).ws
    );
  }

  listen(
    callback: (data: ethers.providers.TransactionResponse[]) => any
  ): void {
    const blockListenerTimes = this.provider.listenerCount("block");
    console.log(blockListenerTimes);

    if (blockListenerTimes < 1) {
      this.provider.on("block", async (hash: string) => {
        console.log(`New transactions in a new block: ${hash}`);
        const blockData = await this.provider.getBlock(hash);

        let executedTransactions: ethers.providers.TransactionResponse[] = [];
        for (const transactionHash of blockData.transactions) {
          const transactionData = await this.provider.getTransaction(
            transactionHash
          );
          executedTransactions.push(transactionData);
        }
        callback(executedTransactions);
      });
    }
  }
}

export default Block;
