import { ethers } from "ethers";
import { abi } from "./abi";

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const CHAIN_ID = 31337;

export const RPC_URL = "http://localhost:8545";

export const NETWORK_NAME = "Local Hardhat";

export const EXPLORER_URL = "https://sepolia.etherscan.io";

export const getFallbackProvider = () =>
  new ethers.providers.JsonRpcProvider(RPC_URL);

export const getWalletProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum, "any");
  }
  return null;
};

export const getContractRead = (provider) =>
  new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

export const getContractWrite = (signer) =>
  new ethers.Contract(CONTRACT_ADDRESS, abi, signer);