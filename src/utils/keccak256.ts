import { ethers } from "ethers";

const hashByKeccak256 = (data: string): string => {
  return ethers.utils.keccak256(data);
};

export { hashByKeccak256 };
