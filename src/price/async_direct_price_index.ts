import { Dex, dex_dict, DexData, DexType } from "../address/dex_data"

import { buildLog, contracts, convertToBigNumber, convertToBN, formatGwei, formatUnitsBN, getBN, log, notify, ZERO } from "../utils/general"
import { IToken } from "../address/coin"
import { flashAmount, flashLoan, flashLoanAddress, ipcProvider, myAccount, walletPrivateKey } from "../config"
import { FlashParams } from "../types/flash"
import { dodo_flashloan_pools } from "../address/flashloan_pool"
import { ethers } from "ethers"
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils'
import { BigNumber } from "bignumber.js";
import { getPriceOnUniV2 } from "./uniswapV2/uniswapV2TypeWeb3"
import { getPriceOnUniV3 } from "./uniswapV3/uniswapV3TypeWeb3"
import { calculateOptimalInput, GasSetting, getReserves } from "./mempoolscan"

const getPrice = (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken, dex: string)
    : Promise<BigNumber> => {

    switch (dex_dict[dex].type) {
        case DexType.UNISWAP_V2:

            return getPriceOnUniV2(
                tokenIn.address,
                tokenOut.address,
                tokenAmount,
                contracts.get(dex)!.router!)

        case DexType.UNISWAP_V3:
        default:
            return getPriceOnUniV3(
                tokenIn,
                tokenOut,
                tokenAmount,
                contracts.get(dex)!.router!)
    }

}

async function executeArbitrage(
    tokenIn: IToken,
    tokenOut: IToken,
    buyDexType: DexType,
    sellDexType: DexType,
    buyDexAddress: string,
    sellDexAddress: string,
    flashloanAmount: number,
    flashloanPool: string,
    gasSetting: GasSetting

) {

    var params: FlashParams = {
        tokenIn: tokenIn.address,
        tokenOut: tokenOut.address,
        buyDexType: buyDexType,
        sellDexType: sellDexType,
        buyDexAddress: buyDexAddress,
        sellDexAddress: sellDexAddress,
        buyAmount: flashloanAmount,
        flashLoanPool: flashloanPool
    }

    const account = myAccount.address
    const privateKey = walletPrivateKey

    const dodoFlashloanFuntion = flashLoan.methods.dodoFlashLoan(params)

    const functionAbi = dodoFlashloanFuntion.encodeABI();


    ipcProvider.eth.getGasPrice().then((gasPrice: string) => {

        const gas: BigNumber = new BigNumber(gasPrice)
        const fullGas: BigNumber | number | undefined | string = gasSetting.type == 0 ? gasSetting.gasPrice : gasSetting.maxFeePerGas

        
        ipcProvider.eth.getTransactionCount(account, 'latest').then(async _nonce => {
            var txParams
            if (gasSetting.type == 0) {
                txParams = {
                    from: account,
                    gas: 2000000,
                    gasPrice: gasSetting.gasPrice,
                    nonce: _nonce,
                    to: flashLoanAddress,
                    //@ts-ignore
                    type: '0x0',
                    data: functionAbi,
                };
            } else {
                txParams = {
                    from: account,
                    gas: 2000000,
                    maxFeePerGas: gasSetting.maxFeePerGas,
                    maxPriorityFeePerGas: gasSetting.maxPriorityFeePerGas,
                    nonce: _nonce,
                    to: flashLoanAddress,
                    type: '0x2',
                    data: functionAbi,
                };

            }

            let start = Date.now()
            const tx = await ipcProvider.eth.accounts.signTransaction(txParams, walletPrivateKey)
            ipcProvider.eth.sendSignedTransaction(tx.rawTransaction!, async (error, hash) => {
                if (!error) {
                    console.log(`time: ${new Date()}
                    hash: ${hash}
                    block: ${await ipcProvider.eth.getBlockNumber()}`)
                } else {
                    log(`\x1b[38;2;255;0;0m${error.message}\x1b[0m`)
                }
            })
            log(`flashloan time: ${Date.now() - start}`)
        })
    });

}

export const checkArbitrage = (tokenA: IToken, tokenB: IToken, amountIn: BigNumber, skipDex: string, logText: string, hash: string, gas: GasSetting, simulatedTokenAReserve: BigNumber, simulatedTokenBReserve: BigNumber) => {

    var flashbn = getBN(flashAmount, tokenB.decimals)
    Object.keys(dex_dict).forEach(async dex => {
        if (dex != skipDex){
            
            let amountOut = await getPrice(amountIn, tokenA, tokenB, dex)
            let amountOutBN = new BigNumber(amountOut)
            if (amountOutBN.gt(flashbn)){
                log(`\x1b[38;2;124;252;0mamountOut ${dex} = ${formatUnitsBN(amountOut, tokenB.decimals)}\x1b[0m`)
                // logText += buildLog(`\x1b[38;2;124;252;0mamountOut ${dex} = ${formatUnitsBN(amountOut, tokenB.decimals)}\x1b[0m`)
                executeArbitrage(tokenA, tokenB, 
                    skipDex=='UNISWAP_V3' ? DexType.UNISWAP_V3 : DexType.UNISWAP_V2,
                    dex=='UNISWAP_V3' ? DexType.UNISWAP_V3 : DexType.UNISWAP_V2,
                    dex_dict[skipDex].router,
                    dex_dict[dex].router,
                    1000000000,
                    '0x5333Eb1E32522F1893B7C9feA3c263807A02d561',
                    gas
                )
                var diff: BigNumber = new BigNumber("5000000000000000000")
                // console.log(logText)
                log(`big trade: ${hash} in block ${(await ipcProvider.eth.getBlockNumber()).toString()}`)
                let [reserveA2, reserveB2] = await getReserves(tokenA.address, tokenB.address, dex_dict[dex].router)
                console.log()
                log(`${skipDex}: ${tokenA.symbol} ${simulatedTokenAReserve.toString(10)}`)
                log(`${skipDex}: ${tokenB.symbol} ${simulatedTokenBReserve.toString(10)}`)

                log(`${dex}: ${tokenA.symbol} ${reserveA2.toString(10)}`)
                log(`${dex}: ${tokenB.symbol} ${reserveB2.toString(10)}`)

                const optimalmine = calculateOptimalInput(simulatedTokenBReserve, simulatedTokenAReserve, reserveA2, reserveB2)
                log(`optimal mine ${formatUnitsBN(optimalmine, tokenB.decimals)} ${tokenB.symbol}`)


                // notify()
            }
            else {
                // logText += buildLog(`\x1b[38;2;124;252;0mamountOut ${dex} = ${formatUnitsBN(amountOut, tokenB.decimals)}\x1b[0m`)
                // console.log(logText)
                log(`${dex} = ${formatUnitsBN(amountOut, tokenB.decimals)}`)
                // log(await ipcProvider.eth.getBlockNumber())
                // log(hash)
            }
        }
    })
    
}