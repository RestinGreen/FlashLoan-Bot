import { Coin } from "../src/address/coin"
import { convertToBigNumber, convertToBN, formatGwei, getBigNumber, getBN, ZERO } from "../src/utils/general"
import { dodo_flashloan_pools } from "../src/address/flashloan_pool"

import { BigNumber, ethers } from "ethers";
import { FlashParams } from "../src/types/flash"
import { DexType, dex_dict } from "../src/address/dex_data"
import { flashAmountBN, flashLoan, flashLoanAddress, httpProvider, myAccount, tokenIn, walletPrivateKey, wsProvider } from "../src/config"
import usdc from "../src/abis/USDC.json"
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"

import Web3 from "web3";
import { AbiItem } from "web3-utils"
import Contract from "web3-eth";
import { findOpAndDoArbitrage } from "../src/price/async_direct_price_index";
import BN from "bn.js";

require('dotenv').config()

const log = require("why-is-node-running")


async function test() {
    console.log(`async test`)


    var amount = 3000
    var coinA = Coin.USDC
    var coinB = Coin.WMATIC
    var amountBN = getBN(amount, Coin.USDC.decimals)
    // console.log(amountBN.toString())
    await findOpAndDoArbitrage(amountBN, coinA, coinB, 1)

}


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

async function account() {

    const USDC = new httpProvider.eth.Contract(usdc.abi as AbiItem[], '0x2791bca1f2de4661ed88a30c99a7a9449aa84174')

    console.log(`usdc in account ${await USDC.methods.balanceOf(myAccount.address).call()}`)
}

function bn() {
    var a: BN = new BN('12312')
    console.log(a.toString(16))
}

async function pool() {
    httpProvider.eth.getPendingTransactions().then(console.log)

    var pendingTransactions = wsProvider.eth.subscribe('pendingTransactions', (error, hash) => {
        if (error) {
            console.error(error)
        }
    })

    pendingTransactions.on('data', data => {
        httpProvider.eth.getTransaction(data).then(tx => {
            console.log(tx.gas)
        })
    })
}
function hex() {
    var x: BN = new BN('15648')
    console.log(x.toString())
}

async function contractCall() {


    var params: FlashParams = {
        tokenIn: Coin.USDC.address,
        tokenOut: Coin.WETH.address,
        buyDexType: DexType.UNISWAP_V2,
        sellDexType: DexType.UNISWAP_V2,
        buyDexAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        sellDexAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
        buyAmount: 3000,
        flashLoanPool: dodo_flashloan_pools['USDC']
    }
    const dodoFlashloanFuntion = flashLoan.methods.dodoFlashLoan(params)
    const account = myAccount.address
    const functionAbi = dodoFlashloanFuntion.encodeABI();
    var gasPrice: string = await httpProvider.eth.getGasPrice()
    //////////////////////////////////////////////////////////////
    // console.log("current gas price unformatted: " + ethers.utils.formatUnits(gasPrice, 'gwei'));
    // console.log("current gas price formatted: " + gasPrice);
    const gas: BN = new BN(gasPrice)
    const extraGas: BN = convertToBN(ethers.utils.parseUnits('1', 'gwei'))
    // console.log(`extra gas unformatted: ${extraGas}`)
    // console.log(`extra gas formatted: ${ethers.utils.formatUnits(convertToBigNumber(extraGas), 'gwei')}`)
    const fullGas: BN = gas.add(extraGas)
    // console.log(`fullgas unformatted: ${fullGas}`)
    // console.log(`fullgas formatted: ${ethers.utils.formatUnits(convertToBigNumber(fullGas), 'gwei')}`)
    console.log(`gas price i will use for the transaction: ${formatGwei(gas.add(extraGas))}`)
                               
    var maxFeePerGas: BN = new BN('192000000000')
    var maxPriorityFeePerGas: BN = new BN('192000000000')
    httpProvider.eth.getTransactionCount(account, 'latest').then(async _nonce => {

        console.log("Nonce: " + _nonce);
        const txParams = {
            from: account,
            gas: 2000000,
            maxFeePerGas: maxFeePerGas,
            maxPriorityFeePerGas: maxPriorityFeePerGas,
            nonce: _nonce,
            to: flashLoanAddress,
            type: '0x2',
            data: functionAbi,
        };

        let start = Date.now()
        const tx = await httpProvider.eth.accounts.signTransaction(txParams, walletPrivateKey)
        httpProvider.eth.sendSignedTransaction(tx.rawTransaction!, async(error, hash) => {
            if (!error) {
                console.log(`time: ${new Date()}
                    hash: ${hash}
                    block: ${await httpProvider.eth.getBlockNumber()}`)
            } else {
                console.log(error)
            }
        })
        console.log('flashloan time', Date.now() - start)
    })

}

async function block() {
    wsProvider.eth.subscribe('newBlockHeaders', async (error, block) => {
        console.log(`websocket block: ${block.number}`)
        var pendingBlock = await httpProvider.eth.getBlock('latest')
        console.log(`http call block: ${pendingBlock.number}`)
    })
}

contractCall()