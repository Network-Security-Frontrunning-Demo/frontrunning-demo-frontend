import React, { useEffect, useState } from "react";
import Transaction from "./common/Transaction";
import { ethers } from "ethers";

import { default as MempoolService } from "@/services/mempool";
import { decodePasswordAttackContract } from "@/utils/transaction";
import { FilterTransactionCallbackType } from "@/@types/filter";
import Block from "@/services/block";

const Mempool = () => {
  const mempool = new MempoolService();
  const block = new Block();

  const [pendingData, setPendingData] = useState<
    FilterTransactionCallbackType[]
  >([]);
  const [executedData, setExecutedData] = useState<
    FilterTransactionCallbackType[]
  >([]);

  const mempoolCallback = (data: ethers.providers.TransactionResponse) => {
    const transactionData = decodePasswordAttackContract(data.data);

    if (transactionData.status && transactionData.data) {
      const newData: FilterTransactionCallbackType = {
        ...data,
        data: transactionData.data,
      };
      setPendingData((oldData) => [...oldData, newData]);
    } else {
      setPendingData((oldData) => [...oldData, data]);
    }
  };

  const blockCallback = (data: ethers.providers.TransactionResponse[]) => {
    let modifyData: FilterTransactionCallbackType[] = [];
    for (const executedTrans of data) {
      const executedTransData = decodePasswordAttackContract(
        executedTrans.data
      );

      if (executedTransData.status && executedTransData.data) {
        const newExecutedTrans: FilterTransactionCallbackType = {
          ...executedTrans,
          data: executedTransData.data,
        };

        modifyData.push(newExecutedTrans);
      } else {
        modifyData.push(executedTrans);
      }
    }
    setExecutedData((oldData) => {
      let arr = [...oldData];
      modifyData.forEach((transaction) => {
        if (arr.filter((item) => item.hash === transaction.hash).length === 0) {
          arr = [...arr, transaction];
        }
      });
      return arr;
    });
    setPendingData([]);
  };

  useEffect(() => {
    mempool.listen(mempoolCallback);
    block.listen(blockCallback);
  }, []);

  return (
    <div id='mempool'>
      <h2 className='title'>Pending Mempool</h2>
      <div id='pending'>
        {pendingData && pendingData.length > 0 ? (
          pendingData.map((data, index) => {
            return (
              <Transaction
                transactionData={data}
                key={index}
                isPending={true}
              ></Transaction>
            );
          })
        ) : (
          <div className='text-center mt-4'>No data</div>
        )}
      </div>
      <h2 className='title mt-12'>Executed Transactions</h2>
      <div id='executed'>
        {executedData && executedData.length > 0 ? (
          executedData.map((data, index) => {
            return (
              <Transaction
                transactionData={data}
                key={index}
                isPending={false}
              ></Transaction>
            );
          })
        ) : (
          <div className='text-center mt-4'>No data</div>
        )}
      </div>
    </div>
  );
};

export default Mempool;
