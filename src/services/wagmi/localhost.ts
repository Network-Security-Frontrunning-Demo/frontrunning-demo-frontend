import { defineChain } from "viem";

export const localhost = /*#__PURE__*/ defineChain({
  id: 1,
  network: "Localhost",
  name: "Private EVM Blockchain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545/websocket"],
    },
    public: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545/websocket"],
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x948B3c65b89DF0B4894ABE91E6D02FE579834F8F",
    },
    ensUniversalResolver: {
      address: "0x712516e61C8B383dF4A63CFe83d7701Bce54B03e",
      blockCreated: 1,
    },
    multicall3: {
      address: "0xbCF26943C0197d2eE0E5D05c716Be60cc2761508",
      blockCreated: 1,
    },
  },
});
