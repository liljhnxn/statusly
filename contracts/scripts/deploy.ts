import { ethers, network } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const currentNetwork = await ethers.provider.getNetwork();
  const chainId = currentNetwork.chainId.toString();
  const isMainnet = chainId === "677";

  const networkName = isMainnet ? "Botchain Mainnet" : "Botchain Testnet";
  const explorerBase = isMainnet ? "https://scan.botchain.ai" : "https://scan.bohr.life";
  const symbol = isMainnet ? "BOT" : "BOHR";

  console.log("----------------------------------------------------");
  console.log(`Deploying Statusly contract to ${networkName} (Chain ID: ${chainId})...`);

  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(
      "No deployer account found! Please make sure PRIVATE_KEY is set in contracts/.env"
    );
  }

  console.log(`Deployer address: ${deployer.address}`);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Account balance: ${ethers.formatEther(balance)} ${symbol}`);

  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice || 20000000000n; // fallback to 20 Gwei
  console.log(`Current Gas Price: ${ethers.formatUnits(gasPrice, "gwei")} Gwei`);

  const Statusly = await ethers.getContractFactory("Statusly");

  // Estimate deployment gas
  const deployTx = await Statusly.getDeployTransaction();
  const estimatedGas = await ethers.provider.estimateGas(deployTx);
  const estimatedCost = estimatedGas * gasPrice;
  console.log(`Estimated Deployment Gas: ${estimatedGas.toString()} units`);
  console.log(`Estimated Cost: ~${ethers.formatEther(estimatedCost)} ${symbol}`);

  console.log("Broadcasting deployment transaction...");
  const statusly = await Statusly.deploy({
    gasPrice: gasPrice,
  });

  await statusly.waitForDeployment();

  const contractAddress = await statusly.getAddress();
  const deploymentTxReceipt = await statusly.deploymentTransaction()?.wait();
  const actualGasUsed = deploymentTxReceipt?.gasUsed || 0n;
  const actualFee = actualGasUsed * (deploymentTxReceipt?.gasPrice || gasPrice);

  console.log("----------------------------------------------------");
  console.log(`Statusly contract deployed successfully to: ${contractAddress}`);
  console.log(`Actual Gas Used: ${actualGasUsed.toString()}`);
  console.log(`Actual Fee Paid: ${ethers.formatEther(actualFee)} ${symbol}`);
  console.log(`View on Explorer: ${explorerBase}/address/${contractAddress}`);
  console.log("----------------------------------------------------");

  // 1. Output ABI & address JSON for frontend
  const artifactPath = path.join(__dirname, "../artifacts/contracts/Statusly.sol/Statusly.json");
  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    const frontendConfigDir = path.join(__dirname, "../../frontend/src/config");

    if (!fs.existsSync(frontendConfigDir)) {
      fs.mkdirSync(frontendConfigDir, { recursive: true });
    }

    const deployedInfo = {
      address: contractAddress,
      chainId: chainId,
      network: networkName,
      explorer: explorerBase,
      abi: artifact.abi,
    };

    fs.writeFileSync(
      path.join(frontendConfigDir, "deployedContract.json"),
      JSON.stringify(deployedInfo, null, 2)
    );
    console.log(`✓ Deployed configuration written to frontend/src/config/deployedContract.json`);
  }

  // 2. Automatically sync frontend/.env.local with deployed address
  const envLocalPath = path.join(__dirname, "../../frontend/.env.local");
  const envContent = `# Statusly Smart Contract Address on ${networkName} (Chain ID ${chainId})\nNEXT_PUBLIC_STATUSLY_CONTRACT_ADDRESS=${contractAddress}\n`;
  fs.writeFileSync(envLocalPath, envContent);
  console.log(`✓ Updated frontend/.env.local with NEXT_PUBLIC_STATUSLY_CONTRACT_ADDRESS=${contractAddress}`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
