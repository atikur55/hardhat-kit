const hre = require("hardhat");
// console.log(hre);

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEARS_IN_SECONDS = 31536000;
  const unlockedTime = currentTimestampInSeconds + ONE_YEARS_IN_SECONDS;

  const lockedAmount = hre.ethers.parseEther("100");
  const MyTest = await hre.ethers.getContractFactory("MyTest");
  const myTest = await MyTest.deploy(unlockedTime, { value: lockedAmount });
  await myTest.waitForDeployment();

  console.log(`Contract 1 ETH & address: ${await myTest.getAddress()}`);
  console.log(myTest);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
