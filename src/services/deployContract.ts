import { ContractFactory, ethers } from "ethers";
import { ChainId, chainIdToRpc } from "@/utils/rpc";
import { contractArtifacts, ContractEnums } from "@frontrun_evm/contracts";

const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const deployContract = async () => {
	const provider = new ethers.providers.JsonRpcProvider(
		chainIdToRpc(ChainId.LOCALHOST).http
	);
	const signer = new ethers.Wallet(PRIVATE_KEY, provider);

	const passwordContractInfo = contractArtifacts[ContractEnums.PasswordAttack];

	if (passwordContractInfo) {
		const factory = new ContractFactory(
			passwordContractInfo.abi as any,
			passwordContractInfo.bytecode as any,
			signer
		);

		const contract = await factory.deploy([]);

		console.log("Address: ", contract.address);
	}
};

export { deployContract };
