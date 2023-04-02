import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre;
  const { execute, get } = deployments;

  const [deployer] = await hre.ethers.getSigners();

  const liquidityMining = await get("LiquidityMining");
  await execute(
    "RewardToken",
    { from: deployer.address, log: true },
    "transferOwnership",
    liquidityMining.address
  );
};

func.tags = ["Ownership"];
export default func;
