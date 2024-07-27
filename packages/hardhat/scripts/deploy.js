// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const SIXTY_SECS = 60;
  // const unlockTime = currentTimestampInSeconds + SIXTY_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("0.0001");
  // const address = "0x765DE816845861e75A25fCA122bb6898B8B1282a"
  
  // const address = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

  const Zenzone = await hre.ethers.getContractFactory("zenzone");
  const zenZone = await Zenzone.deploy();

  console.log(`Done`);

  await zenZone.deployed();

  console.log(`Contract deployed to ${zenZone.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
