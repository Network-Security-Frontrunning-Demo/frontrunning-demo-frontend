import React, { useEffect, useState } from "react";
import { AccountInfoItem } from "@/@types/accountInfo";
import SampleImage from "@/assets/images/sample-image.png";
import Image from "next/image";
import AccountImageHeader from "@/assets/images/account-header-image.svg";
import { useAccount, useBalance } from "wagmi";
import { ContractEnums } from "@frontrun_evm/contracts";
import { getContractAddress } from "@/utils/contract";
import { useSelector } from "react-redux";
import { AppState } from "@/configs/redux";

const AccountInfo: React.FC<{}> = () => {
  const blockNumber = useSelector((state: AppState) => state.blockNumber).value;
  const { address } = useAccount();
  const contractAddress = getContractAddress({
    contractType: ContractEnums.PasswordAttack,
  });
  const { data: contractBalance, refetch: refetchContractBalance } = useBalance(
    {
      address: contractAddress,
    }
  );
  const { data: accountBalance, refetch: refetchAccountBalance } = useBalance({
    address: address,
  });

  const [accounts, setAccounts] = useState<AccountInfoItem[]>([
    {
      address: address as `0x${string}`,
      balances: accountBalance?.formatted
        ? [accountBalance.formatted, accountBalance.formatted]
        : ["0", "0"],
    },
    {
      address: contractAddress as `0x${string}`,
      balances: contractBalance?.formatted
        ? [contractBalance.formatted, contractBalance.formatted]
        : ["0", "0"],
    },
  ]);

  function findIndexInAccounts(address: `0x${string}`): {
    index: number;
    found: boolean;
  } {
    let response = {
      index: -1,
      found: false,
    };

    accounts.forEach((item, idx) => {
      if (item.address === address) {
        response.index = idx;
        response.found = true;
      }
    });

    return response;
  }

  useEffect(() => {
    if (address != undefined) {
      setAccounts([
        {
          address: address as `0x${string}`,
          balances: accountBalance?.formatted
            ? [accountBalance.formatted, accountBalance.formatted]
            : ["0", "0"],
        },
        {
          address: contractAddress as `0x${string}`,
          balances: contractBalance?.formatted
            ? [contractBalance.formatted, contractBalance.formatted]
            : ["0", "0"],
        },
      ]);
    }
  }, [address]);

  useEffect(() => {
    refetchAccountBalance();
    refetchContractBalance();
  }, [blockNumber]);

  useEffect(() => {
    const indexData = findIndexInAccounts(contractAddress);

    if (indexData.found == true) {
      setAccounts((oldAccounts) => {
        if (contractBalance?.formatted) {
          oldAccounts[indexData.index]!.balances[0] =
            oldAccounts[indexData.index]!.balances[1]!;
          oldAccounts[indexData.index]!.balances[1] =
            contractBalance!.formatted;
          const newContractInfo: AccountInfoItem =
            oldAccounts[indexData.index]!;

          const newAccounts: AccountInfoItem[] = [];
          if (indexData.index === 0) {
            newAccounts.push(newContractInfo);
            newAccounts.push(oldAccounts[indexData.index + 1]!);
          } else {
            newAccounts.push(oldAccounts[indexData.index - 1]!);
            newAccounts.push(newContractInfo);
          }

          return newAccounts;
        }
        return oldAccounts;
      });
    }
  }, [contractBalance]);

  useEffect(() => {
    if (address != undefined) {
      const indexData = findIndexInAccounts(address as `0x${string}`);

      if (indexData.found == true) {
        setAccounts((oldAccounts) => {
          if (accountBalance?.formatted) {
            oldAccounts[indexData.index]!.balances[0] =
              oldAccounts[indexData.index]!.balances[1]!;
            oldAccounts[indexData.index]!.balances[1] =
              accountBalance!.formatted;
            const newAccountInfo: AccountInfoItem =
              oldAccounts[indexData.index]!;

            const newAccounts: AccountInfoItem[] = [];
            if (indexData.index === 0) {
              newAccounts.push(newAccountInfo);
              newAccounts.push(oldAccounts[indexData.index + 1]!);
            } else {
              newAccounts.push(oldAccounts[indexData.index - 1]!);
              newAccounts.push(newAccountInfo);
            }

            return newAccounts;
          }

          return oldAccounts;
        });
      }
    }
  }, [accountBalance]);

  return (
    <div className='w-full flex flex-col items-center' id='accountInfo'>
      <h2 className='text-[32px] font-bold mb-[8px] text-white'>
        Account Balance Updated
      </h2>
      <Image
        className='h-[32px] mb-[20px]'
        src={AccountImageHeader}
        alt='account-info-header'
      ></Image>
      <div className='flex flex-col gap-[12px]'>
        {accounts
          // .filter(
          //   (item) => parseInt(item.balances[0]!) != parseInt(item.balances[1]!)
          // )
          .map((account: AccountInfoItem, idx) => {
            return account.address && account.balances.length == 2 ? (
              <React.Fragment key={idx}>
                <div className='item w-[1200px]'>
                  <div className='mr-[30px]' id='image-wrapper'>
                    <Image src={SampleImage} alt='account-info-image' />
                  </div>
                  <div
                    className='flex items-center justify-between gap-[180px] w-full'
                    id='account-info-section'
                  >
                    <p className='text-[18px]'>
                      <span className='font-bold'>Address: </span>{" "}
                      {`${account.address}`}
                    </p>
                    <p className='text-[18px]'>
                      <span className='font-bold'>Balance changed: </span>{" "}
                      {`from ${parseInt(
                        account.balances[0]!
                      )} ETH to ${parseInt(account.balances[1]!)} ETH`}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <></>
            );
          })}
      </div>
    </div>
  );
};

export default AccountInfo;
