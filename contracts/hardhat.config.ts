import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

let rawPrivateKey = process.env.PRIVATE_KEY?.trim() || "";
if (rawPrivateKey && !rawPrivateKey.startsWith("0x")) {
  rawPrivateKey = `0x${rawPrivateKey}`;
}

const isValidKey = rawPrivateKey.length === 66 && rawPrivateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    botchainTestnet: {
      url: "https://rpc.bohr.life",
      chainId: 968,
      accounts: isValidKey ? [rawPrivateKey] : [],
    },
    botchainMainnet: {
      url: "https://rpc.botchain.ai",
      chainId: 677,
      accounts: isValidKey ? [rawPrivateKey] : [],
    },
  },
  etherscan: {
    apiKey: {
      botchainTestnet: "none",
      botchainMainnet: "none",
    },
    customChains: [
      {
        network: "botchainTestnet",
        chainId: 968,
        urls: {
          apiURL: "https://scan.bohr.life/api",
          browserURL: "https://scan.bohr.life",
        },
      },
      {
        network: "botchainMainnet",
        chainId: 677,
        urls: {
          apiURL: "https://scan.botchain.ai/api",
          browserURL: "https://scan.botchain.ai",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
