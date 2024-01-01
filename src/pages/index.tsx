// import {
//   FilterTransactionCallbackType,
//   filterTransactionData,
// } from "@/services/filter";
// import Mempool from "@/services/mempool";
// import { ethers } from "ethers";
// import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import ContractInfo from "@/components/ContractInfo";
import FrontRunInfo from "@/components/FrontRunInfo";
import Mempool from "@/components/Mempool";
import AccountInfo from "@/components/AccountInfo";
import { ToastContainer } from "react-toastify";

const Index = () => {
  // const { address, isConnected } = useAccount();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  // const { disconnect } = useDisconnect();
  // const { data: walletClient, isError, isLoading } = useWalletClient();

  // console.log(walletClient.);
  // useEffect(() => {
  //   const mempool = new Mempool();

  //   mempool.listen((data: ethers.providers.TransactionResponse) => {
  //     filterTransactionData(data, (data: FilterTransactionCallbackType) => {
  //       console.log(data);
  //     });
  //   });
  // }, []);

  // if (isConnected)
  //   return (
  //     <div>
  //       Connected to {address}
  //       <button onClick={() => disconnect()}>Disconnect</button>
  //     </div>
  //   );
  // return <button onClick={() => connect()}>Connect Wallet</button>;
  return (
    <>
      <div id="content">
        <div className="grid grid-cols-10 gap-16">
          <div className="flex flex-col col-span-4 gap-6 mt-[50px]">
            <ContractInfo />
            <FrontRunInfo />
          </div>
          <div className="col-span-6">
            <Mempool />
          </div>
        </div>
        <div className="mt-16">
          <AccountInfo />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Index;
