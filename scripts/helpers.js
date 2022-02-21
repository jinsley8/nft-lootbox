import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// Read environment variables from .env
import 'dotenv/config';

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
  console.error("Wallet private key missing")
  process.exit(1)
}

export const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Wallet private key.
    process.env.WALLET_PRIVATE_KEY,
    // Use Polygon Mumbai network
    ethers.getDefaultProvider("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")
  ),
);

const appAddress = process.env.THIRDWEB_PROJECT;

export async function getApp() {
  const app = await sdk.getAppModule(appAddress);
  return app;
}