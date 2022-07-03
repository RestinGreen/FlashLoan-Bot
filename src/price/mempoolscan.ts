var abiDecoder = require('abi-decoder');
import abiv2 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
import univ2pair from "@uniswap/v2-core/build/IUniswapV2Pair.json"
import IERC20Metadata from "../abis/IERC20Metadata.json"
import { QueryResult } from "pg";
import { address_dex, dex_dict } from "../address/dex_data";
import { ipcProvider, wsProvider } from "../config";
import { findSymbolByAddress, insertTokenData } from "../database";
import { contracts, bn997, formatUnitsBN, getBN, log, bn1000, buildLog, bn1000_sqr, bn997000, bn997_sqr, ZERO } from "../utils/general";
import { AbiItem } from 'web3-utils'
import { IToken } from "../address/coin";
import { BigNumber } from "bignumber.js";
import { getPriceOnUniV2 } from "./uniswapV2/uniswapV2TypeWeb3";
import { Transaction } from "web3-core/types/index";
import { swapETHForExactTokens, swapExactETHForTokensSupportingFeeOnTransferTokens, swapExactTokensForETH, swapExactTokensForETHSupportingFeeOnTransferTokens, swapExactTokensForTokens, swapExactTokensForTokensSupportingFeeOnTransferTokens, swapTokensForExactETH, swapTokensForExactTokens } from "./scan_functions";
import { watchTokens } from "./routes";
const { request, gql } = require('graphql-request')


export function calculateOptimalInput(reserveIn1: BigNumber, reserveOut1: BigNumber, reserveIn2: BigNumber, reserveOut2: BigNumber): BigNumber {



    var gyok = (reserveIn1.multipliedBy(reserveIn2).multipliedBy(reserveOut1).multipliedBy(reserveOut2)).sqrt().decimalPlaces(0)

    var szamlalo = (bn1000_sqr.negated().multipliedBy(reserveIn1).multipliedBy(reserveIn2)).plus(bn997000.multipliedBy(gyok))

    var nevezo = bn997000.multipliedBy(reserveIn2).plus(bn997_sqr.multipliedBy(reserveOut1))

    var optimal: BigNumber = (szamlalo).div(nevezo).decimalPlaces(0)
    return optimal
}

export function calculateProfit(amountIn: BigNumber, reserveIn1: BigNumber, reserveOut1: BigNumber, reserveIn2: BigNumber, reserveOut2: BigNumber): BigNumber {

    var szamlalo = bn997_sqr.multipliedBy(reserveOut1).multipliedBy(reserveOut2).multipliedBy(amountIn)
    var nevezo = bn1000_sqr.multipliedBy(reserveIn1).multipliedBy(reserveIn2).plus(
        amountIn.multipliedBy((bn997000.multipliedBy(reserveIn2)).plus(bn997_sqr.multipliedBy(reserveOut1)))
    )
    return nevezo.eq(ZERO) ? ZERO : (szamlalo.div(nevezo)).minus(amountIn).decimalPlaces(0)
}

export async function getTokenData(address: string): Promise<IToken> {

    var symbol: string = ''
    var decimals: number = 0
    var result = await findSymbolByAddress(address, async function (res: QueryResult<any>, error: string) {
        if (error != '') {
            log(error)
        } else {
            if (res.rowCount == 0) {
                // log(`Token not found in DB. Collectiong data from blockchain.`)
                let tokenContract = new ipcProvider.eth.Contract(IERC20Metadata.abi as AbiItem[], address)
                symbol = await tokenContract.methods.symbol().call()
                decimals = await tokenContract.methods.decimals().call()
                // log(`symbol: ${symbol}`)
                // log(`decimals: ${decimals}`)
                // log(`Inserting token data into DB.`)
                insertTokenData(symbol, address, decimals)
            } else {

                // log(`Token data found in DB`)
                symbol = res.rows[0]['symbol']
                decimals = res.rows[0]['decimals']
                // log(`symbol: ${symbol}`)
                // log(`address: ${res.rows[0]['address']}`)
                // log(`decimals: ${decimals}`)
            }
            return [symbol, decimals]
        }

    })

    return {
        symbol: symbol,
        decimals: decimals,
        address: address
    }
}

function sort(tokenA: string, tokenB: string): [string, string, boolean] {
    var a = new BigNumber(tokenA.slice(2), 16)
    var b = new BigNumber(tokenB.slice(2), 16)
    if (a.lt(b)) {
        return [tokenA, tokenB, false]
    } else {
        // log(`swapped`)
        return [tokenB, tokenA, true]
    }
}

export function calculatePairAddress(tA: string, tB: string, dexAddress: string): string {
    let [tokenA, tokenB, swapped] = sort(tA, tB)

    var factory = dex_dict[address_dex.get(dexAddress)!].factory
    var salt = dex_dict[address_dex.get(dexAddress)!].initHash

    var packTokens = ipcProvider.utils.encodePacked(
        { value: tokenA, type: 'address' },
        { value: tokenB, type: 'address' }
    )

    var hashPackTokens = ipcProvider.utils.keccak256(packTokens!)

    var encoded = ipcProvider.utils.encodePacked(
        { value: '0xff', type: 'uint8' },
        { value: factory, type: 'address' },
        { value: hashPackTokens, type: 'uint' },
        { value: salt, type: 'uint' },
    )

    var hashEncoded: string = ipcProvider.utils.keccak256(encoded!)
    return '0x' + hashEncoded.substring(hashEncoded.length - 40)
}

type GraphqlResponse = {
    [pairDexComp: string]: string
}

export function decodeStorageSlot(storage: string, tokenA: string, tokenB: string): [BigNumber, BigNumber] {

    // var a = await httpProvider.eth.getStorageAt('0x096c5ccb33cfc5732bcd1f3195c13dbefc4c82f4', 8)

    var base = storage.substring(2)

    // var block = base.substring(0, 8)
    // log(block)
    // var timestamp = new BigNumber(block, 16)
    // log(`block number: ${timestamp.toString(10)}`)

    var reserve0 = base.substring(36, 64)
    // log(reserve0)
    var reserve0BN = new BigNumber(reserve0, 16)
    // log(`reserve0: ${reserve0BN.toString(10)}`)

    var reserve1 = base.substring(8, 36)
    // log(reserve1)
    var reserve1BN = new BigNumber(reserve1, 16)
    // log(`reserve1: ${reserve1BN.toString(10)}`)


    var a = new BigNumber(tokenA.slice(2), 16)
    var b = new BigNumber(tokenB.slice(2), 16)
    if (a.lt(b)) {
        return [reserve0BN, reserve1BN]
    } else {
        // log(`swapped`)
        return [reserve1BN, reserve0BN]
    }
}
export async function getDirectPairReserves(tokenA: IToken, tokenB: IToken): Promise<any> {
    var query = gql`
    query () {
        block {
            `

    Object.keys(dex_dict).forEach(dex => {
        query +=
            `${tokenA.symbol}${tokenB.symbol}${dex}:account(address: "${calculatePairAddress(tokenA.address, tokenB.address, dex_dict[dex].router)}"){
                    storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
                    address
                }
                `
        query +=
            `${tokenB.symbol}${tokenA.symbol}${dex}:account(address: "${calculatePairAddress(tokenB.address, tokenA.address, dex_dict[dex].router)}"){
                    storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
                    address
                }
                `
    })
    // watchTokens.forEach(tempToken => {
    //     if (tempToken.symbol != tokenA.symbol)
    //         Object.keys(dex_dict).forEach(dex => {
    //             query +=
    //                 `${tokenA.symbol}${temdTokenAReserve: BigNumber = tokenAReserve.plus(tokenASoldAmount)
    //             }
    //             `
    //         })
    // })

    // watchTokens.forEach(tempToken => {
    //     if (tempToken.symbol != tokenB.symbol)
    //         Object.keys(dex_dict).forEach(dex => {
    //             query +=
    //                 `${tempToken.symbol}${tokenB.symbol}${dex}:account(address: "${calculatePairAddress(tempToken.address, tokenB.address, dex_dict[dex].router)}"){
    //                 storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
    //                 address
    //             }
    //             `
    //         })
    // })

    query += `
            }
        }`

    var start = Date.now()
    var graphql = await request('http://localhost:8545/graphql', query)
        .catch((err: any) => { console.log(err) })

    // console.log(graphql['block'])

    log(`graphql query time: ${Date.now() - start}`)

    return graphql['block']
}

export async function getReserves(tA: string, tB: string, dexAddress: string): Promise<[BigNumber, BigNumber]> {

    let [tokenA, tokenB, swapped] = sort(tA, tB)


    var factory = dex_dict[address_dex.get(dexAddress)!].factory
    var salt = dex_dict[address_dex.get(dexAddress)!].initHash

    var packTokens = ipcProvider.utils.encodePacked(
        { value: tokenA, type: 'address' },
        { value: tokenB, type: 'address' }
    )

    var hashPackTokens = ipcProvider.utils.keccak256(packTokens!)

    var encoded = ipcProvider.utils.encodePacked(
        { value: '0xff', type: 'uint8' },
        { value: factory, type: 'address' },
        { value: hashPackTokens, type: 'uint' },
        { value: salt, type: 'uint' },
    )

    var hashEncoded: string = ipcProvider.utils.keccak256(encoded!)
    var pairAddress = '0x' + hashEncoded.substring(hashEncoded.length - 40)
    // log(`pair address: ${pairAddress}`)

    var uniV2Pair = new ipcProvider.eth.Contract(univ2pair.abi as AbiItem[], pairAddress)
    var reserves = await uniV2Pair.methods.getReserves().call()

    if (swapped) {
        return [new BigNumber(reserves['reserve1']), new BigNumber(reserves['reserve0'])]
    } else {
        return [new BigNumber(reserves['reserve0']), new BigNumber(reserves['reserve1'])]
    }

}

export function getAmountOut(reserveIn: BigNumber, reserveOut: BigNumber, amountIn: BigNumber): BigNumber {

    var amountInWithFee: BigNumber = amountIn.multipliedBy(bn997)
    var numerator: BigNumber = amountInWithFee.multipliedBy(reserveOut)
    var denominator: BigNumber = reserveIn.multipliedBy(bn1000).plus(amountInWithFee)
    return numerator.div(denominator).decimalPlaces(0)

}

export type GasSetting = {
    type: number
    gas: number
    gasPrice: string
    maxFeePerGas: string | number | BigNumber | undefined
    maxPriorityFeePerGas: string | number | BigNumber | undefined
}

export async function scan() {

    abiDecoder.addABI(abiv2.abi)


    var methods = abiDecoder.getMethodIDs()
    // console.log(methods)
    wsProvider.eth.subscribe('pendingTransactions', async (error: Error, hash: string) => {
        if (error) {
            log(error.message)
        } else {
            var tx: Transaction = await ipcProvider.eth.getTransaction(hash)
            if (tx != null && (
                tx.to == '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'       //sushiswap
                || tx.to == '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'    //quickswap
                || tx.to == '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607'    //apeswap
                || tx.to == '0x5C6EC38fb0e2609672BDf628B1fD605A523E5923'    //jetswap
                || tx.to == '0x94930a328162957FF1dd48900aF67B5439336cBD'    //polycat
                || tx.to == '0x3a1D87f206D12415f5b0A33E786967680AAb4f6d')) {//waultswap

                var gas: GasSetting = {
                    //@ts-ignore
                    type: tx.type,
                    gas: tx.gas,
                    gasPrice: tx.gasPrice,
                    maxFeePerGas: tx.maxFeePerGas?.toString(),
                    maxPriorityFeePerGas: tx.maxPriorityFeePerGas?.toString()
                }
                log(`-------------------------------------------------------------------`)
                // log(`${address_dex.get(tx.to)} swap`)
                var logText: string = ''
                // logText += buildLog(`${address_dex.get(tx.to)} swap`)
                log(`${address_dex.get(tx.to)} swap`)


                //function signature bits 
                let funcBits = tx.input.slice(2, 10)
                switch (funcBits) {
                    case '38ed1739': //swapExactTokensForTokens 
                        await swapExactTokensForTokens(abiDecoder, tx, methods, funcBits, 'swapExactTokensForTokens', logText, gas)
                        break
                    case '7ff36ab5': //swapExactETHForTokens
                        await swapExactTokensForTokens(abiDecoder, tx, methods, funcBits, 'swapExactETHForTokens', logText, gas)
                        break
                    case '18cbafe5': //swapExactTokensForETH
                        swapExactTokensForETH()
                        break
                    case 'b6f9de95': //swapExactETHForTokensSupportingFeeOnTransferTokens
                        swapExactETHForTokensSupportingFeeOnTransferTokens()
                        break
                    case '791ac947': //swapExactTokensForETHSupportingFeeOnTransferTokens
                        swapExactTokensForETHSupportingFeeOnTransferTokens()
                        break
                    case '5c11d795': //swapExactTokensForTokensSupportingFeeOnTransferTokens
                        swapExactTokensForTokensSupportingFeeOnTransferTokens()
                        break
                    case 'fb3bdb41': //swapETHForExactTokens
                        swapETHForExactTokens()
                        break
                    case '4a25d94a': //swapTokensForExactETH
                        swapTokensForExactETH()
                        break
                    case '8803dbee': //swapTokensForExactTokens
                        swapTokensForExactTokens()
                        break
                    default:
                        log(`Function not needed. Skipping.\t${methods[funcBits]['name']}`)
                        break

                }

                // log(`-------------------------------------------------------------------`)
            }

        }

    })

}