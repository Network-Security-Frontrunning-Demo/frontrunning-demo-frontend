import React, { useEffect } from "react";
import { Button } from "antd";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Image from "next/image";

import WalletIcon from "@/assets/images/wallet.svg";
import LogoutIcon from "@/assets/images/logout.svg";
import { truncate } from "@/utils/truncate";

const Header = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const walletConnected = localStorage.getItem("walletConnected");

    if (walletConnected && walletConnected == "true") {
      connect();
    }
  }, []);

  return (
    <div id="header">
      <h1 className="text-[28px] font-bold flex gap-3">
        DEMO <p className="text-primary-color">FRONT-RUN</p>
      </h1>
      <div>
        {isConnected ? (
          <div className="text-lg flex items-center gap-4">
            <p className="text-base">
              Connected to address: 0x
              {address && truncate(address.slice(2), 5, 37)}
            </p>
            <Button
              className="text-lg"
              onClick={() => {
                disconnect();
                localStorage.setItem("walletConnected", "false");
              }}
            >
              <p>Disconnect</p>
              <Image
                src={LogoutIcon}
                alt="logout icon"
                className="w-[18px] h-[18px]"
              />
            </Button>
          </div>
        ) : (
          <Button
            className="text-lg"
            loading={isConnecting}
            onClick={() => {
              connect();
              localStorage.setItem("walletConnected", "true");
            }}
          >
            <p>Connect wallet</p>
            <Image
              src={WalletIcon}
              alt="wallet icon"
              className="w-[18px] h-[18px]"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
