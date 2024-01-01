import { ethers } from "ethers";
import { ChainId, chainIdToRpc } from "@/utils/rpc";

const mine = async () => {
	const provider = new ethers.providers.JsonRpcProvider(
		chainIdToRpc(ChainId.LOCALHOST).http
	);

	await provider.send("evm_mine", []);
};

export { mine };
