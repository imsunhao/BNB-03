import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { setStoreAddress, verifyingContract } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, network } = hre;
  const { deploy } = deployments;

  const [deployer] = await hre.ethers.getSigners();
  const proxyAdmin = await deploy("ProxyAdmin", {
    contract: "ProxyAdmin",
    from: deployer.address,
    args: [],
    log: true,
  });
  setStoreAddress(network, deployer, "ProxyAdmin", proxyAdmin);
  await verifyingContract(hre, proxyAdmin);
};

func.tags = ["ProxyAdmin"];
export default func;
