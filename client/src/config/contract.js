import { ethers } from "ethers";
import { abi } from "./abi";

export const CONTRACT_ADDRESS = (import.meta.env.VITE_CONTRACT_ADDRESS || "").trim();

export const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID || 11155111);

export const RPC_URL =
  import.meta.env.VITE_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com";

export const NETWORK_NAME = import.meta.env.VITE_NETWORK_NAME || "Sepolia";

export const EXPLORER_URL =
  import.meta.env.VITE_EXPLORER_URL || "https://sepolia.etherscan.io";

export const hasContractConfig = Boolean(CONTRACT_ADDRESS);

export const getFallbackProvider = () =>
  new ethers.providers.JsonRpcProvider(RPC_URL);

export const getWalletProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum, "any");
  }
  return null;
};

export const getContractRead = (provider) =>
  CONTRACT_ADDRESS ? new ethers.Contract(CONTRACT_ADDRESS, abi, provider) : null;

export const getContractWrite = (signer) =>
  CONTRACT_ADDRESS ? new ethers.Contract(CONTRACT_ADDRESS, abi, signer) : null;