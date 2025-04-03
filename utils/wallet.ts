import { ethers } from "ethers";

// USDT contract ABI (minimal version for balance checking)
const USDT_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// USDT contract address on Ethereum mainnet
const USDT_CONTRACT_ADDRESS = "0x41fd9cc6b252be3dd12f7cec18fcf5e50e0f7c28";
const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/62c6b3f962394cbeb6c2b9ee19dcebad"
);

export async function getWalletBalance(walletAddress: string): Promise<number> {
  try {
    // Connect to Ethereum network
    const usdtContract = new ethers.Contract(
      "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT Contract Address
      ["function balanceOf(address owner) view returns (uint256)"], // USDT Balance Function
      provider
    );
    const balance = await usdtContract.balanceOf(walletAddress);
    const formattedBalance = ethers.utils.formatUnits(balance, 6); // USDT has 6 decimals
    return parseFloat(formattedBalance);
  } catch (error) {
    // console.error("Error fetching wallet balance:", error);
    throw error;
  }
}

export function formatWalletAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 12)}...${address.slice(-5)}`;
}
