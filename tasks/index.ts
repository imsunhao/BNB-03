import { task } from "hardhat/config";
import { verifyingContract } from "../scripts/helper";

task("verifying").setAction(async (_, hre) => {
  const { deployments } = hre;

  // const ProxyAdmin = await deployments.get("ProxyAdmin");
  // await verifyingContract(hre, ProxyAdmin);

  const LiquidityMining = await deployments.get("LiquidityMining");
  await verifyingContract(hre, LiquidityMining);
});
