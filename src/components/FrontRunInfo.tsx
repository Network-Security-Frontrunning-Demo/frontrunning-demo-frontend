import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { mine } from "@/services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useBlockNumber } from "wagmi";
import { updateBlockNumber } from "@/reducers/blockNumber";
import { formatUnits, parseUnits } from "viem";
import { getContractAddress } from "@/utils/contract";
import { ContractEnums, contractArtifacts } from "@frontrun_evm/contracts";
import { useContractWrite } from "wagmi";

const FrontRunInfo = () => {
  // Static Defining
  const contractAddress = getContractAddress({
    contractType: ContractEnums.PasswordAttack,
  });
  const abi = contractArtifacts[ContractEnums.PasswordAttack]!.abi as any;

  // Dispatch
  const dispatch = useDispatch();
  const { data: blockNumberData, refetch } = useBlockNumber();
  const [frontRunData, setFronRunData] = useState({
    password: "",
    gasPrice: "0",
  });

  const {
    data: withdrawData,
    writeAsync: withdraw,
    isSuccess,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: "withdraw",
    args: [frontRunData.password],
    gasPrice: parseUnits(frontRunData.gasPrice, 9),
    gas: BigInt(100000),
  });

  const handleMine = () => {
    mine().then(() => {
      toast.success("Mine new block successfully!");
      refetch();
    });
  };

  const updatePassword = (e: any) => {
    setFronRunData({
      ...frontRunData,
      password: e.target.value as string,
    });
  };

  const updateGasPrice = (e: any) => {
    setFronRunData({
      ...frontRunData,
      gasPrice: e.target.value as string,
    });
  };

  const handleWithdraw = () => {
    withdraw().catch((err) => {
      toast.error(err?.message);
    });
  };

  useEffect(() => {
    dispatch(updateBlockNumber(Number(blockNumberData)));
  }, [blockNumberData]);

  useEffect(() => {
    if (isSuccess == true) {
      toast.success(`Send transaction ${withdrawData?.hash} successfully!`);
    }
  }, [isSuccess]);

  return (
    <div id="front-run">
      <p className="text-xl font-semibold text-white">Front Run Demo</p>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-8 gap-2 items-center">
          <p className="col-span-3 text-base text-white">Password: </p>
          <input
            className="col-span-5 px-3 py-2 text-black outline-none"
            type="text"
            value={frontRunData.password}
            onChange={updatePassword}
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <p className="col-span-3 text-base text-white">
            Gas Price (wei unit):{" "}
          </p>
          <input
            className="col-span-5 px-3 py-2 text-black outline-none"
            type="text"
            value={frontRunData.gasPrice}
            onChange={updateGasPrice}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button className="w-[30%] text-base" onClick={handleMine}>
            Mine
          </Button>
          <Button className="w-[30%] text-base" onClick={handleWithdraw}>
            Withraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FrontRunInfo;
