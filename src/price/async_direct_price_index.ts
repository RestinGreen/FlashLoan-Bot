import { Dex, dex_dict, DexData, DexType, address_dex } from "../address/dex_data"

import { buildLog, contracts, convertToBigNumber, convertToBN, formatGwei, formatUnitsBN, getBN, log, notify, ZERO } from "../utils/general"
import { IToken } from "../address/coin"
import { flashLoan, flashLoanAddress, ipcProvider, myAccount, walletPrivateKey } from "../config"
import { FlashParams } from "../types/flash"
import { dodo_flashloan_pools } from "../address/flashloan_pool"
import { ethers } from "ethers"
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils'
import { BigNumber } from "bignumber.js";
import { getPriceOnUniV2 } from "./uniswapV2/uniswapV2TypeWeb3"
import { getPriceOnUniV3 } from "./uniswapV3/uniswapV3TypeWeb3"
import { Transaction } from "web3-core/types/index";

import { calculateOptimalInput, calculateProfit, decodeStorageSlot, GasSetting, getReserves } from "./mempoolscan"

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
    flashloanAmount: BigNumber,
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
            // log(`flashloan time: ${Date.now() - start}`)
        })
    });

}

export const checkArbitrage = (tokenA: IToken, tokenB: IToken, skipDex: string, logText: string, tx: Transaction, gas: GasSetting, reserves: any, simulatedReserveA: BigNumber, simulatedReserveB: BigNumber) => {
    log(`big trade: ${tx.hash}`)
    Object.keys(dex_dict).forEach(dex => {
        if (dex != skipDex){
            
                var [reserveA2, reserveB2]: [BigNumber, BigNumber] = decodeStorageSlot(reserves[`${tokenA.symbol}${tokenB.symbol}${dex}`]['storage'],tokenA.address, tokenB.address)

                const optimalInput = calculateOptimalInput(simulatedReserveB, simulatedReserveA, reserveA2, reserveB2)
                if(optimalInput.gt(ZERO)) {
                    log(`optimal input ${formatUnitsBN(optimalInput, tokenB.decimals)} ${tokenB.symbol}`)
                    const profit = calculateProfit(optimalInput, simulatedReserveB, simulatedReserveA, reserveA2, reserveB2)
                    log(`\x1b[38;2;124;252;0mprofit at ${dex}: ${formatUnitsBN(profit, tokenB.decimals)} ${tokenB.symbol}\x1b[0m`)
                    notify()
                }
                // if (profit.gt(0)) {
                //     log(`\x1b[38;2;124;252;0mamountOut ${dex} = ${formatUnitsBN(profit, tokenB.decimals)} ${tokenB.symbol}\x1b[0m`)
                    // executeArbitrage(tokenA, tokenB, 
                    //     skipDex=='UNISWAP_V3' ? DexType.UNISWAP_V3 : DexType.UNISWAP_V2,
                    //     dex=='UNISWAP_V3' ? DexType.UNISWAP_V3 : DexType.UNISWAP_V2,
                    //     dex_dict[skipDex].router,
                    //     dex_dict[dex].router,
                    //     optimalInput,
                    //     '0x5333Eb1E32522F1893B7C9feA3c263807A02d561',
                    //     gas
                    // )
                // } else {
                //     log (`amountout ${dex} = ${formatUnitsBN(profit, tokenB.decimals)} ${tokenB.symbol}`)
                // }

            }
        })
    
    
}