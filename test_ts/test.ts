

import { bn1000, bn997, buildLog, contracts, formatUnitsBN, getBN, log } from "../src/utils/general"
import { routes } from "../src/price/routes"
import { Coin, IToken } from "../src/address/coin"

import { address_dex, DexType, dex_dict } from "../src/address/dex_data"
import { getPriceOnUniV2, getPriceOnUniV2Promise, getPriceOnUniV2Request } from "../src/price/uniswapV2/uniswapV2TypeWeb3"
import { getPriceOnUniV3, getPriceOnUniV3Promise } from "../src/price/uniswapV3/uniswapV3TypeWeb3"
import { ipcProvider, wsProvider } from "../src/config"
import { account$, account$$, block$, query$ } from "../src/__generated/fetchers"
import { execute, setGraphQLExecutor } from "../src/__generated"
import { ParameterRef } from "graphql-ts-client-api"
import { createFieldOptions } from "graphql-ts-client-api/dist/FieldOptions"
import { calculateMySimulatedBuy, calculatePairAddress, getReserves } from "../src/price/mempoolscan"
import { selectAll } from "../src/database"
import { BigNumber } from "bignumber.js";

const { request, gql } = require('graphql-request')
const fetch = require("node-fetch")
const why = require('why-is-node-running')


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

const getPricePromise = (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken, dex: string)
    : Promise<BigNumber> => {

    switch (dex_dict[dex].type) {
        case DexType.UNISWAP_V2:

            return getPriceOnUniV2Promise(
                tokenIn.address,
                tokenOut.address,
                tokenAmount,
                contracts.get(dex)!.router!)

        case DexType.UNISWAP_V3:
        default:
            return getPriceOnUniV3Promise(
                tokenIn,
                tokenOut,
                tokenAmount,
                contracts.get(dex)!.router!)
    }

}


// async function pr() {

//     var promises = []

//     let tokenA: IToken = Coin.WETH
//     let tokenB: IToken = Coin.USDC
//     let amountIn: BN = getBN(1, tokenA.decimals)

//     let start = Date.now()

//     for (let i = 0; i < routes.length; i++) {
//         let r1 = routes[i].nodes[0]
//         promises.push(getPricePromise(amountIn, tokenA, tokenB, r1.dexName))

//     }

//     let a = await Promise.all(promises)
//     // console.log(a)

//     log(`${Date.now() - start}`)
// }

async function pr1() {
    let tokenA: IToken = Coin.WETH
    let tokenB: IToken = Coin.USDC
    let amountIn: BigNumber = getBN(1, tokenA.decimals)
    // for (let i = 0; i < routes.length; i++) {
    //     let r1 = routes[i].nodes[0]
    //     let start = Date.now()
    var i = 0
    while (i < 100) {
        i++
        var s = Date.now()
        let price = await getPrice(amountIn, tokenA, tokenB, "SUSHISWAP")
        console.log(Date.now() - s)
    }


    // log(`${Date.now() - start} | price: ${price}`)
    // }

}

async function pr2() {
    var locked: boolean = false
    let tokenA: IToken = Coin.WETH
    let tokenB: IToken = Coin.USDC
    let amountIn: BigNumber = getBN(1, tokenA.decimals)
    // routes.forEach(async route => {
    //     let r1 = route.nodes[0]
    //     var s = Date.now()
    let start = Date.now()
    let price = await getPrice(amountIn, tokenA, tokenB, "QUICKSWAP")
    log(`${Date.now() - start} | price: ${price}`)
    //     if (!locked) {
    //         locked = true
    //         log(`locking`)
    //     } else {
    //         log(`locked`)
    //     }
    // })

}



function pr3() {
    var promises = []

    let tokenA: IToken = Coin.WETH
    let tokenB: IToken = Coin.USDC
    let amountIn: BigNumber = getBN(1, tokenA.decimals)
    let batch = new ipcProvider.eth.BatchRequest()

    let s = Date.now()
    for (let i = 0; i < routes.length; i++) {
        let start = Date.now()
        let r1 = routes[i].nodes[0]
        if (r1.dexName != 'UNISWAP_V3') {
            batch.add(getPriceOnUniV2Request(tokenA.address, tokenB.address, amountIn, contracts.get(r1.dexName)!.router!))

        }

        log(`${Date.now() - start}`)
    }
    batch.execute()
    log(Date.now() - s)

    // console.log(a)

}


async function decodeStorageSlot(a: string) {

    var start = Date.now()
    // var a = await httpProvider.eth.getStorageAt('0x096c5ccb33cfc5732bcd1f3195c13dbefc4c82f4', 8)
    log(a)

    var base = a.substring(2)

    var block = base.substring(0, 8)
    log(block)
    var blbn = new BigNumber(block, 16)
    log(`block number: ${blbn.toString(10)}`)

    var reserve0 = base.substring(36, 64)
    log(reserve0)
    var r1b1 = new BigNumber(reserve0, 16)
    log(`reserve0: ${r1b1.toString(10)}`)

    var reserve1 = base.substring(8, 36)
    log(reserve1)
    var r0bn = new BigNumber(reserve1, 16)
    log(`reserve1: ${r0bn.toString(10)}`)

    log(Date.now() - start)
}


async function oldgraphql() {



    var query = gql`
    query () {
        block {
            `

    let tokenA: IToken = Coin.WETH
    let tokenB: IToken = Coin.USDC
    let amountIn: BigNumber = getBN(1, tokenA.decimals)

    var hopTokens: IToken[] = [Coin.USDC, Coin.WMATIC, Coin.WETH, Coin.DAI, Coin.USDT]

    var start = Date.now()
    hopTokens.forEach(tempToken => {
        if (tempToken.symbol != tokenA.symbol)
            Object.keys(dex_dict).forEach(dex => {
                query +=
                    `tokenA${tempToken.symbol}${dex}:account(address: "${calculatePairAddress(tokenA.address, tempToken.address, dex_dict[dex].router)}"){
                    storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
                    address
                }
                `
            })
    })
    hopTokens.forEach(t1 => {
        hopTokens.forEach(t2 => {
            if (t1.address != t2.address) {
                Object.keys(dex_dict).forEach(dex => {
                    query +=
                        `${t1.symbol}${t2.symbol}${dex}:account(address: "${calculatePairAddress(t1.address, t2.address, dex_dict[dex].router)}"){
                    storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
                    address
                }
                `
                })
            }
        })
    })

    hopTokens.forEach(tempToken => {
        if (tempToken.symbol != tokenB.symbol) {
            Object.keys(dex_dict).forEach(dex => {
                query +=
                    `${tempToken.symbol}tokenB${dex}:account(address: "${calculatePairAddress(tempToken.address, tokenB.address, dex_dict[dex].router)}"){
                    storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
                    address
                }
                `
            })
        }
    })

    Object.keys(dex_dict).forEach(dex => {
        query +=
            `${tokenA.symbol}${tokenB.symbol}${dex}:account(address: "${calculatePairAddress(tokenA.address, tokenB.address, dex_dict[dex].router)}"){
            storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
            address
        }
        `
    })

    query += `
            }
        }`

    log(`${Date.now() - start}`)

    // log(query.toString())
    start = Date.now()
    request('http://localhost:8545/graphql', query)
        .then((res: any) => {

            console.log(res['block'])

            console.log(Date.now() - start)
        })
        .catch((err: any) => { console.log(err) })





}

export async function executeGraphQL(request: string, variables: object): Promise<any> {
    const response = await fetch('http://localhost:8545/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: request,
            variables: variables
        }),
    });
    return await response.json();
}
async function test() {

    setGraphQLExecutor(executeGraphQL)
    const query = query$.block(
        block$.number
    )




    log(query.toString())
    var start = Date.now()
    const resp = await execute(query)

    // decodeStorageSlot(resp.block?.account.storage!)
    log(resp)
    log(Date.now() - start)
}

async function slip() {
    var c = contracts.get("QUICKSWAP")!.router

    var ta = Coin.USDC
    var tb = Coin.WETH
    
    var quick = await getReserves(ta.address, tb.address, "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506")
    var sushi = await getReserves(ta.address, tb.address, "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff")
    // var quick = [new BigNumber(924640389686500890254), new BigNumber(1124480494871)]
    // var sushi = [new BigNumber(928640389686500890254), new BigNumber(1164480494871)]

    var amountIn: BigNumber = getBN("1000", ta.decimals)
    var buyTB = calculateMySimulatedBuy(quick[0], quick[1], amountIn)
    // log(`${formatUnitsBN(buyTB, tb.decimals)} ${tb.symbol} bought on quickswap`)

    var sellTB = calculateMySimulatedBuy(sushi[1], sushi[0], buyTB)
    log(`profit: ${formatUnitsBN(sellTB.minus(amountIn).decimalPlaces(0), ta.decimals)}`)
    
    
    var bn1000_sqr = bn1000.multipliedBy(bn1000)
    var bn997_sqr = bn997.multipliedBy(bn997)
    var bn997000 = bn1000.multipliedBy(bn997)

    var gyok =  (quick[0].multipliedBy(sushi[0]).multipliedBy(quick[1]).multipliedBy(sushi[1])).sqrt().decimalPlaces(0)

    var szamlalo = (bn1000_sqr.negated().multipliedBy(quick[0]).multipliedBy(sushi[0])).plus(bn997000.multipliedBy(gyok))

    var nevezo = bn997000.multipliedBy(sushi[0]).plus(bn997_sqr.multipliedBy(quick[1]))

    var optimal1: BigNumber = (szamlalo).div(nevezo).decimalPlaces(0)
    // log(formatUnitsBN(optimal1, ta.decimals))
    log(`${szamlalo.toString(10)}`)
    log(`${nevezo.toString(10)}`)
    log(`${formatUnitsBN(optimal1, ta.decimals)}`)


    // log(formatUnitsBN(sellTB, ta.decimals))

}
test()
