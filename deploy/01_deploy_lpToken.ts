import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { setStoreAddress, verifyingContract } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, network } = hre;
  const { deploy } = deployments;

  const [deployer] = await hre.ethers.getSigners();

  const lpToken = await deploy("LPToken", {
    contract: "LPToken",
    from: deployer.address,
    args: [],
    log: true,
  });

  setStoreAddress(network, deployer, "LPToken", lpToken);
  await verifyingContract(hre, lpToken);
};

func.tags = ["LPToken"];
export default func;
