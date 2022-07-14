import { Dex, dex_dict, DexData, DexType, address_dex } from "../address/dex_data"

import { formatUnitsBN, log, notify, ZERO } from "../utils/general"
import { IToken } from "../address/coin"
import { account1, account1Key, account2, account2Key, arbContract, arbContractAddress, ipcProvider, myAccount, walletPrivateKey } from "../config"
import { BigNumber } from "bignumber.js";
import { Transaction } from "web3-core/types/index";

import { calculateOptimalInput, calculateProfit, decodeStorageSlot, GasSetting, getAmountIn, getAmountOut, getReserves } from "./mempoolscan"
import { ArbParams } from "../types/arbParams"


async function executeArbitrage(
    params: ArbParams,
    gasSetting: GasSetting,
    account: string,
    key: string
) {


    // const account = myAccount.address

    const arbFunction = arbContract.methods.printMoney(
        params?.flashAmount,
        params?.flashToken,
        params?.paybackToken,
        params?.path)

    arbContract.methods.printMoney(
        params?.flashAmount,
        params?.flashToken,
        params?.paybackToken,
        params?.path).estimateGas()
        .then((gas: any) => {
            log(`gas: ${gas}`)
        }).catch((error: any) => {
            log(error)
        })

    const functionAbi = arbFunction.encodeABI();





    ipcProvider.eth.getTransactionCount(account, 'latest').then(async _nonce => {
        var txParams
        if (gasSetting.type == 0) {
            txParams = {
                from: account,
                gas: 500000,
                gasPrice: gasSetting.gasPrice,
                nonce: _nonce,
                to: arbContractAddress,
                //@ts-ignore
                type: '0x0',
                data: functionAbi,
            };
        } else {
            txParams = {
                from: account,
                gas: 500000,
                maxFeePerGas: gasSetting.maxFeePerGas,
                maxPriorityFeePerGas: gasSetting.maxPriorityFeePerGas,
                nonce: _nonce,
                to: arbContractAddress,
                type: '0x2',
                data: functionAbi,
            };

        }


        const tx = await ipcProvider.eth.accounts.signTransaction(txParams, key)
        ipcProvider.eth.sendSignedTransaction(tx.rawTransaction!, async (error, hash) => {
            if (!error) {
                log(`my transaction ${hash}`)
            }
        }).then((a) => {
            log(a.blockNumber)
            log(`success ${a.transactionHash}`)
        }).catch((error) => {
            log(`\x1b[38;2;255;0;0m${error.message}\x1b[0m`)
        })
        // log(`flashloan time: ${Date.now() - start}`)
    })

}

export const checkArbitrage = (tokenA: IToken, tokenB: IToken, skipDex: string, logText: string, tx: Transaction, gas: GasSetting, reserves: any, simulatedReserveA: BigNumber, simulatedReserveB: BigNumber, pair1: string) => {
    log(`big trade: ${tx.hash}`)
    var max: BigNumber = ZERO
    var params: ArbParams = undefined
    var profit: BigNumber = ZERO
    Object.keys(dex_dict).forEach(dex => {
        if (dex != skipDex) {

            var [reserveA2, reserveB2]: [BigNumber, BigNumber] = decodeStorageSlot(reserves[`${tokenA.symbol}${tokenB.symbol}${dex}`]['storage'], tokenA.address, tokenB.address)
            var pair2 = reserves[`${tokenA.symbol}${tokenB.symbol}${dex}`]['address']
            const optimalInput = calculateOptimalInput(simulatedReserveB, simulatedReserveA, reserveA2, reserveB2)



            if (optimalInput.gt(ZERO)) {
                log(`optimal input ${formatUnitsBN(optimalInput, tokenB.decimals)} ${tokenB.symbol}`)
                profit = calculateProfit(optimalInput, simulatedReserveB, simulatedReserveA, reserveA2, reserveB2)
                if (profit.gt(optimalInput.multipliedBy(0.003)) && profit.gt(max)) {
                    max = profit
                    let flashAmount: BigNumber = getAmountOut(simulatedReserveB, simulatedReserveA, optimalInput)
                    params = {
                        flashToken: tokenA.address,
                        flashAmount: flashAmount,
                        paybackToken: tokenB.address,
                        paybackAmount: optimalInput,
                        path: [pair1, pair2],
                        //pair1Out: getAmountOut(reserveA2, reserveB2, flashAmount)
                    }
                }
            }
        }
    })
    if (!max.isEqualTo(ZERO)) {
        var minimum: BigNumber = new BigNumber(tokenB.minimum!, 10)
        log(`minimum: ${formatUnitsBN(minimum, tokenB.decimals)} ${tokenB.symbol}`)
        if (max.gt(minimum)) {
            executeArbitrage(params, gas, myAccount.address, walletPrivateKey)
            executeArbitrage(params, gas, account1.address, account1Key)
            executeArbitrage(params, gas, account2.address, account2Key)
            notify()
            log(`\x1b[38;2;124;252;0mprofit: ${formatUnitsBN(profit, tokenB.decimals)} ${tokenB.symbol}\x1b[0m`)
        }

    }
}

export const checkArbitrageTest = async (
    tokenA: IToken,
    tokenB: IToken,
    skipDex: string,
    logText: string,
    tx: Transaction,
    gas: GasSetting,
    reserves: any,
    simulatedReserveA: BigNumber,
    simulatedReserveB: BigNumber,
    pair1: string) => {
    log(`big trade: ${tx.hash}`)

    var list: string[] = []
    Object.keys(dex_dict).forEach(dex => {
        list.push(dex)
    })
    var max: BigNumber = ZERO

    var params: ArbParams = undefined

    for (let i = 0; i < list.length; i++) {
        var dex = list[i]
        if (dex != skipDex) {


            var [reserveA2, reserveB2, pair2]: [BigNumber, BigNumber, string] = await getReserves(tokenA.address, tokenB.address, dex_dict[dex].router)

            const optimalInput = calculateOptimalInput(simulatedReserveB, simulatedReserveA, reserveA2, reserveB2)
            if (optimalInput.gt(ZERO)) {
                log(`optimal input ${formatUnitsBN(optimalInput, tokenB.decimals)} ${tokenB.symbol}`)
                const profit = calculateProfit(optimalInput, simulatedReserveB, simulatedReserveA, reserveA2, reserveB2)
                if (profit.gt(optimalInput.multipliedBy(0.003)) && profit.gt(max)) {
                    max = profit
                    log(`\x1b[38;2;124;252;0mprofit at ${dex}: ${formatUnitsBN(profit, tokenB.decimals)} ${tokenB.symbol}\x1b[0m`)
                    let flashAmount: BigNumber = getAmountOut(simulatedReserveB, simulatedReserveA, optimalInput)
                    params = {
                        flashToken: tokenA.address,
                        flashAmount: flashAmount,
                        paybackToken: tokenB.address,
                        paybackAmount: optimalInput,
                        path: [pair1, pair2],
                        // pair1Out: getAmountOut(reserveA2, reserveB2, flashAmount)
                    }
                }
            }
        }
    }
    if (!max.isEqualTo(ZERO)) {
        // notify()
        executeArbitrage(params, gas, myAccount.address, walletPrivateKey)
    }
}