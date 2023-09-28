// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const NFTMarketplace = await hre.ethers.deployContract("NFTMarketplace");
  const nFTMarketplace = await NFTMarketplace.waitForDeployment();
  const marketAdf = await nFTMarketplace.getAddress()
  console.log("====",marketAdf);


  const MyToken = await hre.ethers.deployContract("MyToken", [`${marketAdf}`]);
  const myToken = await MyToken.waitForDeployment();
  console.log("====",await myToken.getAddress());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
