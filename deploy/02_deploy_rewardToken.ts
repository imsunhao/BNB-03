import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { setStoreAddress, verifyingContract } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, network } = hre;
  const { deploy } = deployments;

  const [deployer] = await hre.ethers.getSigners();

  const rewardToken = await deploy("RewardToken", {
    contract: "RewardToken",
    from: deployer.address,
    args: [],
    log: true,
  });

  setStoreAddress(network, deployer, "RewardToken", rewardToken);
  await verifyingContract(hre, rewardToken);
};

func.tags = ["RewardToken"];
export default func;
