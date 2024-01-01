import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import { useContractRead, useBalance, useSendTransaction } from "wagmi";
import { getContractAddress } from "@/utils/contract";
import { ContractEnums, contractArtifacts } from "@frontrun_evm/contracts";
import ChainImage from "@/assets/images/chain-blockchain.webp";
import Logo from "@/assets/images/logo.png";
import { breakLine } from "@/utils/breakLine";
import { parseEther } from "viem";
import { useSelector } from "react-redux";
import type { AppState } from "@/configs/redux";
import { toast } from "react-toastify";

const ContractInfo = () => {
  // State Handler
  const [depositInput, setDepositInput] = useState(0);
  const blockNumber = useSelector((state: AppState) => state.blockNumber);

  // Static Defining
  const contractAddress = getContractAddress({
    contractType: ContractEnums.PasswordAttack,
  });
  const abi = contractArtifacts[ContractEnums.PasswordAttack]!.abi as any;

  // Wagmi Handler
  const { data: hashPasswordData, refetch: refetchHashPassword } =
    useContractRead({
      address: contractAddress,
      abi: abi,
      functionName: "hashPassword",
      cacheTime: 0,
    });

  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: contractAddress,
    cacheTime: 0,
  });
  const {
    data: depositData,
    sendTransactionAsync: executeDeposit,
    isLoading,
    isSuccess,
  } = useSendTransaction({
    to: contractAddress,
    value: parseEther(depositInput.toString()),
  });

  const handleDepositInput = (e: any) => {
    let inputValue = e.target.value || 0;
    setDepositInput(inputValue);
  };

  const handleDeposit = () => {
    executeDeposit().catch((err) => {
      toast.error(err?.message);
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Send transaction ${depositData?.hash} successfully!`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (blockNumber.value != 0) {
      refetchBalance();
      refetchHashPassword();
      setDepositInput(0);
    }
  }, [blockNumber.value]);

  return (
    <div id="contract-info">
      <Image src={ChainImage} alt="chain" />
      <div className=" bg-header-bg mt-[-80px] flex flex-col gap-6 items-center border-t-[2px] border-border-color">
        <div className=" flex items-center mt-[-50px]">
          <div className="border-[2px] border-border-color">
            <Image src={Logo} alt="logo" />
          </div>
          <p
            className="px-2 py-4 border-r-[2px] border-y-[2px] border-border-color
            h-[60%] text-white text-lg font-semibold bg-header-bg"
          >
            Password Attack
          </p>
        </div>
        <div className="text-white w-full px-8 pb-8 flex flex-col gap-6">
          <div className="grid grid-cols-8 gap-2">
            <p className="col-span-3">Hash password: </p>
            <p className="col-span-5 text-primary-text">
              {hashPasswordData ? breakLine(hashPasswordData as any, 10) : "0x"}
            </p>
          </div>

          <div className="grid grid-cols-8 gap-2">
            <p className="col-span-3">Contract balance: </p>
            <p className="col-span-5 text-primary-text">{`${balanceData?.formatted} ${balanceData?.symbol}`}</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-8 gap-2 items-center">
              <p className="col-span-3">Deposit amount: </p>
              <input
                className="col-span-5 px-3 py-2 text-black outline-none"
                type="text"
                onChange={handleDepositInput}
                value={depositInput}
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="w-[30%] text-base"
                onClick={handleDeposit}
                loading={isLoading}
              >
                Deposit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;
