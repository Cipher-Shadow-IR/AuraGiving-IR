const hre = require("hardhat");

async function main() {
  const CharityDonation = await hre.ethers.getContractFactory("CharityDonation");
  const contract = await CharityDonation.deploy();

  await contract.deployed();

  const chainId = (await hre.ethers.provider.getNetwork()).chainId;

  console.log(`CharityDonation deployed to: ${contract.address}`);
  console.log(`Network chainId: ${chainId}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});