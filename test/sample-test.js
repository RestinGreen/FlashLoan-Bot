const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("deploy", async function () {
    const F = await ethers.getContractFactory("Flashloan")
    const flashloan = await F.deploy()

    await flashloan.deployed()

    console.log("flashloan deployed to:", flashloan.address);

    const addr = flashloan.address
    this.accounts = await ethers.getSigners()

    this.owner = this.accounts[0]



  });
});
