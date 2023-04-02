import * as fs from "fs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment, Network } from "hardhat/types";

export const readAddressList = function () {
  return JSON.parse(fs.readFileSync("address.json", "utf-8"));
};

export const storeAddressList = function (addressList: object) {
  fs.writeFileSync("address.json", JSON.stringify(addressList, null, "\t"));
};

export const getstoreAddress = function (
  network: Network,
  contractName: string
) {
  const addressList = readAddressList();
  const returnValue = addressList[network.name][contractName];
  if (!returnValue) {
    throw Error(
      `No address found for ${contractName} on ${network.name} network`
    );
  }
  return returnValue;
};

export const setStoreAddress = function (
  network: Network,
  deployer: SignerWithAddress,
  contractName: string,
  contract: DeployResult
) {
  const addressList = readAddressList();
  if (!addressList[network.name]) addressList[network.name] = {};
  addressList[network.name][contractName] = contract.address;
  if (contract.implementation) {
    addressList[network.name][contractName + "Implementation"] =
      contract.implementation;
  }
  console.log(
    `Deployed ${contractName}
  account        => ${deployer.address}
  implementation => ${contract.implementation}
  address        => ${contract.address}\n\n`
  );
  storeAddressList(addressList);
};

export const verifyingContract = async function (
  hre: HardhatRuntimeEnvironment,
  contract: DeployResult,
  constructorArguments: string[] = []
) {
  const { network } = hre;
  if (network.name === "hardhat") return;
  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: constructorArguments,
  });
  console.log(`${contract.address} verified!`);
};
