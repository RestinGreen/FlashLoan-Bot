

import { bn1000, bn997, buildLog, contracts, formatUnitsBN, getBN, log, ZERO } from "../src/utils/general"
import { routes, watchTokens } from "../src/price/routes"
import { Coin, IToken } from "../src/address/coin"

import { address_dex, DexType, dex_dict } from "../src/address/dex_data"
import { getPriceOnUniV2, getPriceOnUniV2Promise, getPriceOnUniV2Request } from "../src/price/uniswapV2/uniswapV2TypeWeb3"
import { getPriceOnUniV3, getPriceOnUniV3Promise } from "../src/price/uniswapV3/uniswapV3TypeWeb3"
import { ipcProvider, wsProvider } from "../src/config"
import { ParameterRef } from "graphql-ts-client-api"
import { createFieldOptions } from "graphql-ts-client-api/dist/FieldOptions"
import { getAmountOut, calculatePairAddress, getReserves, getDirectPairReserves, decodeStorageSlot, getAmountIn } from "../src/price/mempoolscan"
import { blacklist, selectAll, updateMinimum } from "../src/database"
import { BigNumber } from "bignumber.js";
import { GraphQLResponse } from "graphql-request/dist/types"

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


//  function decodeStorageSlot() {
//     // storage: '0x62c0b0f10000000000de65acc2befa9f885c000000078fdccfea0da2c88bae75',
//     // address: '0xadbf1854e5883eb8aa7baf50705338739e558e5b'
//     var a = "0x62c0b0f10000000000de65acc2befa9f885c000000078fdccfea0da2c88bae75"
//     var start = Date.now()
//     // var a = await httpProvider.eth.getStorageAt('0x096c5ccb33cfc5732bcd1f3195c13dbefc4c82f4', 8)
//     log(a)

//     var base = a.substring(2)

//     var block = base.substring(0, 8)
//     log(block)
//     var blbn = new BigNumber(block, 16)
//     log(`block number: ${blbn.toString(10)}`)

//     var reserve0 = base.substring(36, 64)
//     log(reserve0)
//     var r1b1 = new BigNumber(reserve0, 16)
//     log(`reserve0: ${r1b1.toString(10)}`)

//     var reserve1 = base.substring(8, 36)
//     log(reserve1)
//     var r0bn = new BigNumber(reserve1, 16)
//     log(`reserve1: ${r0bn.toString(10)}`)

//     log(Date.now() - start)
// }


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

async function slip() {
    var c = contracts.get("QUICKSWAP")!.router

    var ta = Coin.USDC
    var tb = Coin.WETH

    var quick = await getReserves(ta.address, tb.address, "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506")
    var sushi = await getReserves(ta.address, tb.address, "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff")
    // var quick = [new BigNumber(924640389686500890254), new BigNumber(1124480494871)]
    // var sushi = [new BigNumber(928640389686500890254), new BigNumber(1164480494871)]

    var amountIn: BigNumber = getBN("1000", ta.decimals)
    var buyTB = getAmountOut(quick[0], quick[1], amountIn)
    // log(`${formatUnitsBN(buyTB, tb.decimals)} ${tb.symbol} bought on quickswap`)

    var sellTB = getAmountOut(sushi[1], sushi[0], buyTB)
    log(`profit: ${formatUnitsBN(sellTB.minus(amountIn).decimalPlaces(0), ta.decimals)}`)


    var bn1000_sqr = bn1000.multipliedBy(bn1000)
    var bn997_sqr = bn997.multipliedBy(bn997)
    var bn997000 = bn1000.multipliedBy(bn997)

    var gyok = (quick[0].multipliedBy(sushi[0]).multipliedBy(quick[1]).multipliedBy(sushi[1])).sqrt().decimalPlaces(0)

    var szamlalo = (bn1000_sqr.negated().multipliedBy(quick[0]).multipliedBy(sushi[0])).plus(bn997000.multipliedBy(gyok))

    var nevezo = bn997000.multipliedBy(sushi[0]).plus(bn997_sqr.multipliedBy(quick[1]))

    var optimal1: BigNumber = (szamlalo).div(nevezo).decimalPlaces(0)
    // log(formatUnitsBN(optimal1, ta.decimals))
    log(`${szamlalo.toString(10)}`)
    log(`${nevezo.toString(10)}`)
    log(`${formatUnitsBN(optimal1, ta.decimals)}`)


    // log(formatUnitsBN(sellTB, ta.decimals))

}
async function directPairsGraphQL() {
    var query = gql`
    query () {
        block {
            `

    let tokenA: IToken = Coin.WETH
    let tokenB: IToken = Coin.USDC

    watchTokens.forEach(tempToken => {
        if (tempToken.symbol != tokenA.symbol)
            Object.keys(dex_dict).forEach(dex => {
                query +=
                    `${tokenA.symbol}${tempToken.symbol}${dex}:account(address: "${calculatePairAddress(tokenA.address, tempToken.address, dex_dict[dex].router)}"){
                    storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
                    address
                }
                `
            })
    })

    watchTokens.forEach(tempToken => {
        if (tempToken.symbol != tokenB.symbol)
            Object.keys(dex_dict).forEach(dex => {
                query +=
                    `${tempToken.symbol}${tokenB.symbol}${dex}:account(address: "${calculatePairAddress(tempToken.address, tokenB.address, dex_dict[dex].router)}"){
                    storage(slot: "0x0000000000000000000000000000000000000000000000000000000000000008")
                    address
                }
                `
            })
    })

    query += `
            }
        }`

    console.log(query)
    var start = Date.now()
    var graphql = await request('http://localhost:8545/graphql', query)
        .catch((err: any) => { console.log(err) })

    console.log(graphql['block'])

    console.log(Date.now() - start)
}


async function testReserves() {

    let tokenA: IToken = Coin.WETH
    let tokenB: IToken = Coin.USDC
    let to = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"

    var reserves = await getDirectPairReserves(tokenA, tokenB)
    var [tokenAReserve, tokenBReserve]: [BigNumber, BigNumber] = decodeStorageSlot(reserves[`${tokenA.symbol}${tokenB.symbol}${address_dex.get(to!)}`]['storage'], tokenA.address, tokenB.address)
    log(reserves[`${tokenA.symbol}${tokenB.symbol}${address_dex.get(to!)}`]['address'])

    let [tokenAReservee, tokenBReservee] = await getReserves(tokenA.address, tokenB.address, to!)
    console.log('igazi', tokenAReservee.toString(10))
    console.log('igazi', tokenBReservee.toString(10))
    console.log('graph', tokenAReserve.toString(10))
    console.log('graph', tokenBReserve.toString(10))
}

function createWallet() {

    var account = ipcProvider.eth.accounts.create()
    console.log(account)
}

async function getMinProfit() {

    const USDC = Coin.USDC
    const minUSDC = getBN(0.3, USDC.decimals)
    const WMATIC = Coin.WMATIC
    const minWMATIC = getBN(0.3, WMATIC.decimals)
    const WETH = Coin.WETH
    const minWETH = getBN(0.0000063, WETH.decimals)
    var tokens: IToken[] = await selectAll()
    type Table = {
        symbolA: string
        symbolB: string
        reserve0: string
        reserve1: string
        pair: string
        min: number
    }

    var table: Table[] = []
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        if (token.symbol == USDC.symbol) {
            updateMinimum(minUSDC.toString(10), token.address)
            continue
        }
        if (token.symbol == WMATIC.symbol) {
            updateMinimum(minWMATIC.toString(10), token.address)
            continue
        }
        if (token.symbol == WETH.symbol) {
            updateMinimum(minWETH.toString(10), token.address)
            continue
        }
        var [reserve0, reserve1, pair]: [BigNumber, BigNumber, string] = await getReserves(token.address, USDC.address, '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff')
        var [reserve00, reserve11, pair]: [BigNumber, BigNumber, string] = await getReserves(token.address, WMATIC.address, '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff')
        var [reserve000, reserve111, pair]: [BigNumber, BigNumber, string] = await getReserves(token.address, WETH.address, '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff')
        if ((!reserve0.isZero() && !reserve1.isZero()) || (!reserve00.isZero() && !reserve11.isZero()) || (!reserve000.isZero() && !reserve111.isZero())) {
            let min1 = getAmountIn(reserve0, reserve1, minUSDC)
            let min2 = getAmountIn(reserve00, reserve11, minWMATIC)
            let min3 = getAmountIn(reserve000, reserve111, minWETH)
            if (min1.gt(ZERO) || min2.gt(ZERO) || min3.gt(ZERO)) {
                if (min1.gt(min2) && min1.gt(min3)) {
                    table.push({
                        symbolA: token.symbol,
                        symbolB: USDC.symbol,
                        reserve0: reserve0.toString(10),
                        reserve1: reserve1.toString(10),
                        pair: pair,
                        min: min1.toNumber()//formatUnitsBN(min1, token.decimals)
                    })
                    updateMinimum(min1.toString(10), token.address)
                } else if (min2.gt(min1) && min2.gt(min3)){
                    table.push({
                        symbolA: token.symbol,
                        symbolB: WMATIC.symbol,
                        reserve0: reserve00.toString(10),
                        reserve1: reserve11.toString(10),
                        pair: pair,
                        min: min2.toNumber()//formatUnitsBN(min2, token.decimals)
                    })
                    updateMinimum(min2.toString(10), token.address)
                } else if (min3.gt(min1) && min3.gt(min2)) {
                    table.push({
                        symbolA: token.symbol,
                        symbolB: WETH.symbol,
                        reserve0: reserve000.toString(10),
                        reserve1: reserve111.toString(10),
                        pair: pair,
                        min: min3.toNumber()//formatUnitsBN(min3, token.decimals)
                    })
                    updateMinimum(min3.toString(10), token.address)
                }
            } else {
                blacklist(token.address)
            }
        } else {
            blacklist(token.address)
        }

    }

    log('done')
    console.table(table)
    console.log(table.length)

}

function charremove() {

    let x = 'asd `2.0 (POS)'
    x = x.replace(/[^a-zA-Z ()]/g, "")
    log(x)
}

import abiv2r2 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
import { Transaction } from "web3-core/types/index";
function newDex() {

    var dexs = [
        '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
        '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607',
        '0x5C6EC38fb0e2609672BDf628B1fD605A523E5923',
        '0x94930a328162957FF1dd48900aF67B5439336cBD',
        '0x3a1D87f206D12415f5b0A33E786967680AAb4f6d',
        '0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429',
        '0x4237a813604bD6815430d55141EA2C24D4543e44',
        '0xfBE675868f00aE8145d6236232b11C44d910B24a',
        '0xfE0E493564DB7Ae23a7b6Ea07F2C633Ee8f25f22',
        '0xdBe30E8742fBc44499EB31A19814429CECeFFaA0',
        '0x93bcDc45f7e62f89a8e901DC4A0E2c6C427D9F25',
        '0x711a119dCee9d076e9f4d680C6c8FD694DAaF68D',
        '0x09Fd8B8ed6E30e583379Dc73b9261dF5E1A28b6F',
        '0xf38a7A7Ac2D745E2204c13F824c00139DF831FFf',
        '0x6AC823102CB347e1f5925C634B80a98A3aee7E03',
        '0x324Af1555Ea2b98114eCb852ed67c2B5821b455b',
        '0xaD340d0CD0B117B0140671E7cB39770e7675C848',
        '0x9bc2152fD37b196C0Ff3C16f5533767c9A983971',
        '0xAf877420786516FC6692372c209e0056169eebAf',
        '0x938B544Ce2AE40B6dE0Ab728a69c37A60159689A',
        '0x158d0b57Cc72509C3A9f476526887Ca8D7873fc4',
        '0x57dE98135e8287F163c59cA4fF45f1341b680248',
        '0xC02D3bbe950C4Bde21345c8c9Db58b7aF57C6668',
        '0x751D346B92f3dce8813E6b6E248a11C534F4BdEa',
        '0x94EA87Ec2f4B084b587eDf60aAbb28a53466ea51',
        '0x9055682E58C74fc8DdBFC55Ad2428aB1F96098Fc',
        '0xa5c17e5B45f22B15086c8d0246B98ebBC0edA05f',
    ]

    var found: string[] = []
    var abiDecoder = require('abi-decoder');
    abiDecoder.addABI(abiv2r2.abi)
    wsProvider.eth.subscribe('pendingTransactions', async (error: Error, hash: string) => {
        var tx: Transaction = await ipcProvider.eth.getTransaction(hash)
        if (tx != null) {
            let funcBits = tx.input.slice(2, 10)
            switch (funcBits) {
                case '38ed1739': //swapExactTokensForTokens 
                case '7ff36ab5': //swapExactETHForTokens
                case '18cbafe5': //swapExactTokensForETH
                case 'b6f9de95': //swapExactETHForTokensSupportingFeeOnTransferTokens
                case '791ac947': //swapExactTokensForETHSupportingFeeOnTransferTokens
                case '5c11d795': //swapExactTokensForTokensSupportingFeeOnTransferTokens
                case 'fb3bdb41': //swapETHForExactTokens
                case '4a25d94a': //swapTokensForExactETH
                case '8803dbee': //swapTokensForExactTokens
                    if (dexs.indexOf(tx.to!) == -1 && found.indexOf(tx.to!) == -1) {
                        console.log(tx.to)
                        found.push(tx.to!)
                    }
                    break
                default:
                    // log(funcBits)
                    // log(`Function not needed. Skipping.\t${methods[funcBits]['name']}`)
                    break
            }
        }
    })
}
getMinProfit()