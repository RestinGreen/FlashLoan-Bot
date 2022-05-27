require('dotenv').config();

import { Coin, IToken } from "./address/coin";
import { flashAmount, flashAmountBN, flashLoan, provider, signer, tokenIn, tokenIns, tokenOut, tokenOuts } from "./config";
import { Graph, Node } from "./types/graph";
import { BigNumber, ethers } from "ethers"
import { getBestPriceAsync } from "./price/async_graph_price_index";
import { Route, RouteNode } from "./types/maxRoute";
import { getPriceAllDex, MaxRoute } from "./price/direct_price_index";
import { dodo_flashloan_pools } from "./address/flashloan_pool";
import { FlashParams } from "./types/flash";
import { dex_dict } from "./address/dex_data";


const routerTokens: IToken[] = [Coin.USDC, Coin.WETH, Coin.WMATIC, Coin.WBTC]

function buildGraph(tokenIn: IToken, tokenOut: IToken): Graph {

    var graph: Graph = new Graph()

    var head: Node = graph.addNode(tokenIn, 0)

    head.addEdgeTo(tokenOut, graph, 1)

    routerTokens.forEach(rt1 => {
        if (rt1.symbol !== tokenIn.symbol && rt1.symbol !== tokenOut.symbol) {
            var layer1_node = head.addEdgeTo(rt1, graph, 1)

            layer1_node.addEdgeTo(tokenOut, graph, 2)
            routerTokens.forEach(rt2 => {
                if (rt2.symbol !== tokenIn.symbol && rt2.symbol !== tokenOut.symbol
                    && layer1_node.route.find(r => r.token.symbol == rt2.symbol) == undefined) {
                    var layer2_node = layer1_node.addEdgeTo(rt2, graph, 2)

                    var layer3_node = layer2_node.addEdgeTo(tokenOut, graph, 3)
                }
            })
        }
    });

    return graph

}



function printRoute(route: RouteNode) {
    console.log(`${route.dex}: ${route.tokenIn.symbol} -> ${route.tokenOut.symbol} = ${ethers.utils.formatUnits(route.amountBought, route.tokenOut.decimals)}`)
}

async function promiseDepth(head: Node, amountIn: BigNumber): Promise<Route> {

    var wait: any[] = []
    var wait1: any[] = []
    var wait2: any[] = []
    var routes: Route[] = []

    head.neighbours.forEach(layer1 => {

        wait.push(getBestPriceAsync(amountIn, head.token, layer1.token).then(max1 => {

            if (layer1.neighbours.length == 0) {
                let route: Route = new Route(max1.amountBought)
                console.log(`---------------------------`)
                printRoute(max1)
                route.addNode(max1)
                console.log(`---------------------------`)
                routes.push(route)

            } else {
                layer1.neighbours.forEach(layer2 => {

                    wait1.push(getBestPriceAsync(max1.amountBought, layer1.token, layer2.token).then(max2 => {
                        if (layer2.neighbours.length == 0) {
                            let route: Route = new Route(max2.amountBought)
                            console.log(`---------------------------`)
                            printRoute(max1)
                            route.addNode(max1)
                            printRoute(max2)
                            route.addNode(max2)
                            console.log(`---------------------------`)
                            routes.push(route)
                        } else {
                            layer2.neighbours.forEach(layer3 => {
                                wait2.push(getBestPriceAsync(max2.amountBought, layer2.token, layer3.token).then(max3 => {
                                    let route: Route = new Route(max3.amountBought)
                                    console.log(`---------------------------`)
                                    printRoute(max1)
                                    route.addNode(max1)
                                    printRoute(max2)
                                    route.addNode(max2)
                                    printRoute(max3)
                                    route.addNode(max3)
                                    console.log(`---------------------------`)
                                    routes.push(route)
                                }))
                            })
                        }
                    }))
                })
            }
        }))
    })

    var startO = Date.now()
    var start = Date.now()
    await Promise.all(wait)
    console.log(`layer1 duration ${Date.now() - start}`)
    start = Date.now()
    await Promise.all(wait1)
    console.log(`layer2 duration ${Date.now() - start}`)
    start = Date.now()
    await Promise.all(wait2)
    console.log(`layer3 duration ${Date.now() - start}`)
    console.log(`overall duration ${Date.now() - startO}`)

    let max: Route = new Route(BigNumber.from(0))
    routes.forEach(route => {
        if (route.finalAmount.gt(max.finalAmount)) {
            max = route
        }
    })
    max.print()

    return max
}

function main() {


    var flashloaning: Map<string, boolean> = new Map<string, boolean>()
    // gets the best profit with direct swaps

    tokenIns.forEach(async tin => {
        console.log('asd')
        tokenOuts.forEach(async tout => {
            console.log('asd2')
            if (tin.symbol != tout.symbol) {
                while (1) {
                    let start = Date.now()
                    var [profitable, route] = await getPriceAllDex(flashAmountBN, tin, tout)
                    let end = Date.now()
                    console.log('get price time: ', end - start)
                    let id = route.buy_from.concat(route.sell_at).concat(tokenIn.symbol).concat(tokenOut.symbol)
                    if (profitable && route.profit.gt(1)) {
                        if (!flashloaning.get(id)) {
                            flashloaning.set(id, true)
                            console.log('get price time: ', end - start)
                            console.log(`initating flash loan`)

                            const gasPrice = await provider.getGasPrice();
                            const extraGas = ethers.utils.parseUnits("100", "gwei");

                            var flashpool: string = dodo_flashloan_pools[tin.symbol]

                            var params: FlashParams = {
                                tokenIn: tin.address,
                                tokenOut: tout.address,
                                buyDexType: dex_dict[route.buy_from].type,
                                sellDexType: dex_dict[route.sell_at].type,
                                buyDexAddress: dex_dict[route.buy_from].address,
                                sellDexAddress: dex_dict[route.sell_at].address,
                                buyAmount: flashAmount,
                                flashLoanPool: flashpool
                            }
                            
                            start = Date.now()
                            await flashLoan.connect(signer).dodoFlashLoan(params, {
                                gasLimit: 15000000,
                                gasPrice: gasPrice.add(extraGas),
                            })
                            console.log('flashloan time', Date.now() - start)

                            flashloaning.set(id, false)
                        }
                    }
                }
            }
        })
    })
    // getPriceAllDex(flashAmountBN, tokenIn, tokenOut).catch(error => {
    //     console.log(error)
    // })


    // gets the max price
    // getBestPriceAsync(flashAmountBN, tokenIn, tokenOut)

    //async graph type best rout max amount out search

    // var graphIn = buildGraph(tokenIn, tokenOut)
    // var graphOut = buildGraph(tokenOut, tokenIn)
    // promiseDepth(graphIn.nodes.get(0)!, flashAmountBN).then(max => {
    //     console.log(`------------------------------------------------------------------------------`)

    //     promiseDepth(graphOut.nodes.get(0)!, max.finalAmount)
    // })

    console.log('asd3')
}

main()
