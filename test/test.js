const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyTest", function () {
  async function runEveryTime() {
    const ONE_YEAR_IN_SECONDS = 31536000;
    const ONE_GEWI = 1_000_000_000;

    const lockedAmount = ONE_GEWI;
    const unlockedTime = (await time.latest()) + ONE_YEAR_IN_SECONDS;

    const [owner, otherAccount] = await ethers.getSigners();

    const MyTest = await ethers.getContractFactory("MyTest");
    const myTest = await MyTest.deploy(unlockedTime, { value: lockedAmount });
    console.log("Deployed contract address:", await myTest.getAddress());
    return { myTest, unlockedTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("should check unlocktime", async function () {
      const { myTest, unlockedTime } = await loadFixture(runEveryTime);
      expect(await myTest.unlockedTime()).to.equal(unlockedTime);
      //   console.log(ab);
    });

    // checking owner
    it("should set the right owner", async function () {
      const { myTest, owner } = await loadFixture(runEveryTime);
      expect(await myTest.owner()).to.equal(owner.address);
    });

    // checking the balance

    it("should receive and store the funds to MyTest", async function () {
      const { myTest, lockedAmount } = await loadFixture(runEveryTime);
      const contractBal = await ethers.provider.getBalance(
        await myTest.getAddress()
      );
      expect(contractBal).to.equal(lockedAmount);
    });
  });

  runEveryTime();
});
