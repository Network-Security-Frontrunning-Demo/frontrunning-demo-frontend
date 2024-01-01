import { ethers } from "ethers";
import { ContractEnums, contractArtifacts } from "@frontrun_evm/contracts";
import { DecodePasswordData, DecodePasswordResponse } from "@/@types/decode";

const decodePasswordAttackContract = (data: string): DecodePasswordResponse => {
  const passwordAttackInterface = new ethers.utils.Interface(
    contractArtifacts[ContractEnums.PasswordAttack]!.abi as any
  );

  let response: DecodePasswordResponse = {
    status: false,
    data: undefined,
  };
  try {
    const decodedData = passwordAttackInterface.decodeFunctionData(
      "withdraw",
      data
    ) as any;

    let decodePasswordResponse = {
      password: decodedData.password as string,
    } as DecodePasswordData;

    response = {
      status: true,
      data: decodePasswordResponse,
    };
  } catch (err) {
    response.status = false;
  }

  return response;
};

export { decodePasswordAttackContract };
