import { BigNumber } from "bignumber.js";
import { Transaction } from "web3-core/types/index";
import { Coin, IToken } from "../address/coin";
import { address_dex } from "../address/dex_data";
import { ipcProvider } from "../config";
import { buildLog, formatUnitsBN, getBN, log } from "../utils/general";
import { checkArbitrage } from "./async_direct_price_index";
import { getAmountOut, GasSetting, getReserves, getTokenData, getDirectPairReserves, decodeStorageSlot } from "./mempoolscan";
import { watchTokenAddresses, watchTokens } from "./routes";

export async function swapExactTokensForTokens(
    abiDecoder: any,
    tx: Transaction,
    methods: any,
    funcBits: string,
    name: string,
    logText: string,
    gas: GasSetting) {

    
    // log(`${name}`)
    logText += buildLog(`${name}`)
    let decoded_input = abiDecoder.decodeMethod(tx.input);
    // console.log('decoded params: ', decoded_input['params'])

    var outputType = methods[funcBits]['outputs'][0]['type']

    var simulate = await ipcProvider.eth.call({
        to: tx.to!,
        from: tx.from,
        data: tx.input
    }).catch(error => {
        log(`Error simulating. ${error.message}`)
        // logText += buildLog('ErrorSimulating.')
        // console.log(logText)
        return
    })
    if (simulate == undefined)
        return
    let simulationResult = ipcProvider.eth.abi.decodeParameters([outputType], simulate!)
    log(`length ${decoded_input['params'][2].value.length}`)
    // logText += buildLog(`length ${decoded_input['params'][2].value.length}`)
    for (let i = 0; i < decoded_input['params'][2].value.length - 1; i++) {
        let tokenAAddress = decoded_input['params'][2].value[i]
        let tokenBAddress = decoded_input['params'][2].value[i + 1]
        
        // if (!watchTokenAddresses.includes(tokenBAddress)) {
        //     log(`TokenB |${(await getTokenData(tokenBAddress)).symbol}|is not supported. Skipping`)
        //     // logText += buildLog(`TokenB |${(await getTokenData(tokenBAddress)).symbol}|is not supported. Skipping`)
        //     continue
        // }


        let tokenASoldAmount: BigNumber = new BigNumber(simulationResult[0][i], 10)
        let tokenBBoughtAmount: BigNumber = new BigNumber(simulationResult[0][i + 1], 10)
        let tokenA: IToken = await getTokenData(tokenAAddress)
        let tokenB: IToken = await getTokenData(tokenBAddress)
        log(`sold:\t\t${tokenA.symbol}\t${formatUnitsBN(tokenASoldAmount, tokenA.decimals)}`)
        // logText += buildLog(`sold:\t\t${tokenA.symbol}\t${formatUnitsBN(tokenASoldAmount, tokenA.decimals)}`)
        log(`bought:\t${tokenB.symbol}\t${formatUnitsBN(tokenBBoughtAmount, tokenB.decimals)}`)
        // logText += buildLog(`bought:\t${tokenB.symbol}\t${formatUnitsBN(tokenBBoughtAmount, tokenB.decimals)}`)



        var reserves = await getDirectPairReserves(tokenA, tokenB)
        var [tokenAReserve, tokenBReserve]: [BigNumber, BigNumber] = decodeStorageSlot(reserves[`${tokenA.symbol}${tokenB.symbol}${address_dex.get(tx.to!)}`]['storage'], tokenA.address, tokenB.address)
        let simulatedTokenAReserve: BigNumber = tokenAReserve.plus(tokenASoldAmount)
        let simulatedTokenBReserve: BigNumber = tokenBReserve.minus(tokenBBoughtAmount)

        // logText += buildLog(`${tokenA.symbol}\t${tokenAReserve}`)
        // logText += buildLog(`${tokenB.symbol}\t${tokenBReserve}`)
        // log(`simulated ${tokenA.symbol}\treserve: ${simulatedTokenAReserve}`)
        // logText += buildLog(`simulated ${tokenA.symbol}\treserve: ${simulatedTokenAReserve}`)
        // log(`simulated ${tokenB.symbol}\treserve: ${simulatedTokenBReserve}`)
        // logText += buildLog(`simulated ${tokenB.symbol}\treserve: ${simulatedTokenBReserve}`)


        // log(`simulated buy with ${flashAmount} ${tokenB.symbol} => ${formatUnitsBN(mySimulatedBuy, tokenA.decimals)} ${tokenA.symbol}`)
        // logText += buildLog(`simulated buy with ${flashAmount} ${tokenB.symbol} => ${formatUnitsBN(mySimulatedBuy, tokenA.decimals)} ${tokenA.symbol}`)




        checkArbitrage(tokenA, tokenB, address_dex.get(tx.to!)!, logText, tx, gas, reserves, simulatedTokenAReserve, simulatedTokenBReserve )
    }
}

export async function swapETHForExactTokens() {
    log(`swapETHForExactTokens`)
}

export async function swapExactTokensForETH() {
    log(`swapExactTokensForETH`)
}
export async function swapExactETHForTokensSupportingFeeOnTransferTokens() {
    log(`swapExactETHForTokensSupportingFeeOnTransferTokens`)
}

export async function swapExactTokensForETHSupportingFeeOnTransferTokens() {
    log(`swapExactTokensForETHSupportingFeeOnTransferTokens`)
}

export async function swapExactTokensForTokensSupportingFeeOnTransferTokens() {
    log(`swapExactTokensForTokensSupportingFeeOnTransferTokens`)
}

export async function swapTokensForExactETH() {
    log('swapTokensForExactETH')
}

export async function swapTokensForExactTokens() {
    log(`swapTokensForExactTokens`)
}