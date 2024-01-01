import { ContractEnums } from "@frontrun_evm/contracts";
import { ethers } from "ethers";

const getContractAddress = ({
  contractType,
}: {
  contractType: ContractEnums;
}): `0x${string}` => {
  switch (contractType) {
    case ContractEnums.PasswordAttack:
      return "0x8464135c8F25Da09e49BC8782676a84730C318bC";

    default:
      return ethers.constants.AddressZero;
  }
};

export { getContractAddress };
