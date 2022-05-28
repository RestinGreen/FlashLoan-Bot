const { expect } = require("chai");
const { ethers } = require("hardhat");
const { abi }  = require("./usdc.json")
require("dotenv").config();

describe("Te", function () {
  it("deploy", async function () {

    var accounts = await ethers.getSigners()
    var owner = accounts[1]
    console.log(ethers.utils.formatUnits(await owner.getBalance(), 18))

    const F = await ethers.getContractFactory("Flashloan")
    const flashloan = await F.deploy()

    await flashloan.deployed()

    console.log("flashloan deployed to:", flashloan.address);
    var balanceBefore = await owner.getBalance()


    const flash = await F.attach(flashloan.address)
    var provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:9999')
    var usdcContract = new ethers.Contract('0x2791bca1f2de4661ed88a30c99a7a9449aa84174', abi, provider)
    console.log('before flashloan: ', await usdcContract.balanceOf(owner.address))

    var params = {
      tokenIn: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      tokenOut: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      buyDexType: 0,
      sellDexType: 1,
      buyDexAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
      sellDexAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
      buyAmount: 3000,
      flashLoanPool: '0x5333Eb1E32522F1893B7C9feA3c263807A02d561'
  }
    
    await flash.connect(owner).dodoFlashLoan(params)
    console.log(ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei'))
    console.log('after flashloan: ', await usdcContract.balanceOf(owner.address))
    var balanceAfter = await owner.getBalance()

    console.log(`flashloan cost ${ethers.utils.formatUnits(balanceBefore.sub(balanceAfter), 18)}`)
  });
});
