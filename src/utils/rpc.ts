import { RpcInterface } from "@/@types/rpc";

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,
  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  CELO = 42220,
  CELO_ALFAJORES = 44787,
  GNOSIS = 100,
  MOONBEAM = 1284,
  BSC_TESTNET = 97,
  BSC_MAINNET = 56,
  LOCALHOST = 1337,
}

export enum ChainName {
  MAINNET = "mainnet",
  ROPSTEN = "ropsten",
  RINKEBY = "rinkeby",
  GÖRLI = "goerli",
  KOVAN = "kovan",
  OPTIMISM = "optimism-mainnet",
  OPTIMISTIC_KOVAN = "optimism-kovan",
  ARBITRUM_ONE = "arbitrum-mainnet",
  ARBITRUM_RINKEBY = "arbitrum-rinkeby",
  POLYGON = "polygon-mainnet",
  POLYGON_MUMBAI = "polygon-mumbai",
  CELO = "celo-mainnet",
  CELO_ALFAJORES = "celo-alfajores",
  GNOSIS = "gnosis-mainnet",
  MOONBEAM = "moonbeam-mainnet",
  BSC_TESTNET = "bsc-testnet",
  BSC_MAINNET = "bsc-mainnet",
  LOCALHOST = "localhost",
}

export function chainIdToChainName(chainId: ChainId) {
  switch (chainId) {
    case ChainId.MAINNET:
      return ChainName.MAINNET;
    case ChainId.ROPSTEN:
      return ChainName.ROPSTEN;
    case ChainId.RINKEBY:
      return ChainName.RINKEBY;
    case ChainId.GOERLI:
      return ChainName.GÖRLI;
    case ChainId.KOVAN:
      return ChainName.KOVAN;
    case ChainId.OPTIMISM:
      return ChainName.OPTIMISM;
    case ChainId.OPTIMISTIC_KOVAN:
      return ChainName.OPTIMISTIC_KOVAN;
    case ChainId.ARBITRUM_ONE:
      return ChainName.ARBITRUM_ONE;
    case ChainId.ARBITRUM_RINKEBY:
      return ChainName.ARBITRUM_RINKEBY;
    case ChainId.POLYGON:
      return ChainName.POLYGON;
    case ChainId.POLYGON_MUMBAI:
      return ChainName.POLYGON_MUMBAI;
    case ChainId.CELO:
      return ChainName.CELO;
    case ChainId.CELO_ALFAJORES:
      return ChainName.CELO_ALFAJORES;
    case ChainId.GNOSIS:
      return ChainName.GNOSIS;
    case ChainId.MOONBEAM:
      return ChainName.MOONBEAM;
    case ChainId.BSC_TESTNET:
      return ChainName.BSC_TESTNET;
    case ChainId.BSC_MAINNET:
      return ChainName.BSC_MAINNET;
    case ChainId.LOCALHOST:
      return ChainName.LOCALHOST;
  }
}

/**
 *
 * @param chainId
 * @returns if chainId is not in enum, will return rpc of testnet
 */
export function chainIdToRpc(chainId: ChainId | null): RpcInterface {
  switch (chainId) {
    case ChainId.LOCALHOST:
      return {
        http: "http://127.0.0.1:8545",
        ws: "ws://127.0.0.1:8545/websocket",
      };
    default:
      throw new Error("Not valid chainId");
  }
}
