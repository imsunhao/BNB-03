import { DeployFunction, ProxyOptions } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  getstoreAddress,
  setStoreAddress,
  verifyingContract,
} from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, network } = hre;
  const { deploy } = deployments;

  const [deployer] = await hre.ethers.getSigners();

  const rewardTokenAddress = getstoreAddress(network, "RewardToken");

  const proxyOptions: ProxyOptions = {
    proxyContract: "LiquidityMiningProxy",
    viaAdminContract: "ProxyAdmin",
    execute: {
      init: {
        methodName: "initialize",
        args: [rewardTokenAddress],
      },
    },
  };

  const liquidityMining = await deploy("LiquidityMining", {
    contract: "LiquidityMiningLogic",
    from: deployer.address,
    proxy: proxyOptions,
    args: [],
    log: true,
  });

  setStoreAddress(network, deployer, "LiquidityMining", liquidityMining);
  await verifyingContract(hre, liquidityMining);
};

func.tags = ["liquidityMining"];
export default func;
