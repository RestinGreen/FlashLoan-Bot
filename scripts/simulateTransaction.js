// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const ethers = require("ethers")
const Web3 = require("web3");
const sushiswapabi  = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json")
const wethabi  = require("../src/abis/WETH.json")
const wmaticabi  = require("../src/abis/WMATIC.json")
const maticabi = require("../src/abis/MATIC.json")
const usdcabi = require("../src/abis/USDC.json")

async function main() {
    // await network.provider.send("evm_setIntervalMining", [5000]);
    
    const provider = new Web3('http://127.0.0.1:8888')
    const whale = "0x72a53cdbbcc1b9efa39c834a540550e23463aacb"
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [whale],
      });
    

    const sushiswap = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
    const weth = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
    const wmatic = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
    const matic = "0x0000000000000000000000000000000000001010"
    const usdc = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"

    const wethContract = new provider.eth.Contract(wethabi.abi, weth)
    const wmaticContract = new provider.eth.Contract(wmaticabi.abi, wmatic)
    const maticContract = new provider.eth.Contract(maticabi.abi, matic)
    const usdcContract = new provider.eth.Contract(usdcabi.abi, usdc)
    const sushiswapcontract = new provider.eth.Contract(sushiswapabi.abi, sushiswap)
    

    
    console.log('usdc: ', ethers.utils.formatUnits(await usdcContract.methods.balanceOf(whale).call(), 6))
    console.log('weth: ', ethers.utils.formatUnits(await wethContract.methods.balanceOf(whale).call(), 18))

    await wethContract.methods.approve(sushiswap, "100000000000000000000").send({from: whale})
    // await usdcContract.methods.approve(sushiswap, "1000000000000000000000000").send({from: whale})
    await sushiswapcontract.methods.swapExactTokensForTokens(
        // "5000000000",        // 5000 usdc
        "1000000000000000000",   // 1 eth
        1,
        [weth, usdc],
        // [usdc, weth],
        whale,
        9999999999999
        ).send({from: whale})
    
    console.log()
    console.log('usdc: ', ethers.utils.formatUnits(await usdcContract.methods.balanceOf(whale).call(), 6))
    console.log('weth: ', ethers.utils.formatUnits(await wethContract.methods.balanceOf(whale).call(), 18))


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
