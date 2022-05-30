import { Coin } from "../src/address/coin"
import { getBigNumber, getBN, ZERO } from "../src/utils/general"
import { dodo_flashloan_pools } from "../src/address/flashloan_pool"

import { BigNumber, ethers } from "ethers";
import { FlashParams } from "../src/types/flash"
import { dex_dict } from "../src/address/dex_data"
import { flashAmountBN, httpProvider, myAccount, tokenIn } from "../src/config"
import usdc from "../src/abis/USDC.json"
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"

import Web3 from "web3";
import { AbiItem } from "web3-utils"
import Contract from "web3-eth";
import { findOpAndDoArbitrage } from "../src/price/async_direct_price_index";
import  BN from "bn.js";

require('dotenv').config()

const log = require("why-is-node-running")


async function test() {
    console.log(`async test`)


    var amount = 3000
    var coinA = Coin.USDC
    var coinB = Coin.WMATIC
    var amountBN = getBN(amount, Coin.USDC.decimals)
    console.log(amountBN.toString())
        // var start = Date.now()
        await findOpAndDoArbitrage(amountBN, coinA, coinB, 1)
        // console.log(Date.now() - start)

    }


// }
// function gas() {
//     console.log(ethers.utils.formatUnits('98004002052', 'gwei'))
// }

// function date() {
//     while (1) {
//         var date: Date = new Date()
//         console.log(date)
//     }
// }

async function web3js(id: number) {

    var w3 = new Web3('http://127.0.0.1:8545')
    var contract = new w3.eth.Contract(
        IUniswapV2Router02.abi as AbiItem[],
        `0x3a1D87f206D12415f5b0A33E786967680AAb4f6d`
        )
    var tokenIn = Coin.USDC
    var tokenOut = Coin.WMATIC
    var w3ws = new Web3('ws://127.0.0.1:8546')
    w3ws.eth.subscribe('newBlockHeaders', async (error, event) => {
        var start = Date.now()
        var price = await contract.methods.getAmountsOut(
            getBigNumber(3000, tokenIn.decimals),
            [
                tokenIn.address,
                tokenOut.address
            ]
        ).call()
        var end = Date.now()


        console.log(`block: ${event.number} time: ${end - start} ms, ${tokenOut.symbol} amount: ${ethers.utils.formatUnits(price[1], tokenOut.decimals)} \t id=${id}`)
    })


}

async function ethersjs(id: number) {

    var ethersProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545')
    var ethersWsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8546')
    var contract = new ethers.Contract(
        `0x3a1D87f206D12415f5b0A33E786967680AAb4f6d`,
        IUniswapV2Router02.abi,
        ethersProvider
        )
    var tokenIn = Coin.USDC
    var tokenOut = Coin.WMATIC
    ethersWsProvider.on('block', async (blockNumber) => {
        var start = Date.now()
        var price = await contract.getAmountsOut(
            getBigNumber(3000, tokenIn.decimals),
            [
                tokenIn.address,
                tokenOut.address
            ]
        )
        var end = Date.now()


        console.log(`block: ${blockNumber} time: ${end - start} ms, ${tokenOut.symbol} amount: ${ethers.utils.formatUnits(price[1], tokenOut.decimals)} \t id=${id}`)
    })
}
function bn() {

    let x = getBN(10, 2)
    console.log(x.toString())
    
}
// log()

async function account() {

    const USDC = new httpProvider.eth.Contract(usdc.abi as AbiItem[], '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' )
    
    console.log(`usdc in account ${await USDC.methods.balanceOf(myAccount.address).call()}`)
}

account()