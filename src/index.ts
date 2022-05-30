require('dotenv').config();

import { Coin, IToken } from "./address/coin";
import { flashAmountBN, tokenIns, tokenOuts, wsProvider } from "./config";
import { Graph, Node } from "./types/graph";
import { ethers } from "ethers"
import { RouteNode } from "./types/maxRoute";
import { findOpAndDoArbitrage } from "./price/async_direct_price_index";

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

// async function promiseDepth(head: Node, amountIn: BigNumber): Promise<Route> {

//     var wait: any[] = []
//     var wait1: any[] = []
//     var wait2: any[] = []
//     var routes: Route[] = []

//     head.neighbours.forEach(layer1 => {

//         wait.push(getBestPriceAsync(amountIn, head.token, layer1.token).then(max1 => {

//             if (layer1.neighbours.length == 0) {
//                 let route: Route = new Route(max1.amountBought)
//                 console.log(`---------------------------`)
//                 printRoute(max1)
//                 route.addNode(max1)
//                 console.log(`---------------------------`)
//                 routes.push(route)

//             } else {
//                 layer1.neighbours.forEach(layer2 => {

//                     wait1.push(getBestPriceAsync(max1.amountBought, layer1.token, layer2.token).then(max2 => {
//                         if (layer2.neighbours.length == 0) {
//                             let route: Route = new Route(max2.amountBought)
//                             console.log(`---------------------------`)
//                             printRoute(max1)
//                             route.addNode(max1)
//                             printRoute(max2)
//                             route.addNode(max2)
//                             console.log(`---------------------------`)
//                             routes.push(route)
//                         } else {
//                             layer2.neighbours.forEach(layer3 => {
//                                 wait2.push(getBestPriceAsync(max2.amountBought, layer2.token, layer3.token).then(max3 => {
//                                     let route: Route = new Route(max3.amountBought)
//                                     console.log(`---------------------------`)
//                                     printRoute(max1)
//                                     route.addNode(max1)
//                                     printRoute(max2)
//                                     route.addNode(max2)
//                                     printRoute(max3)
//                                     route.addNode(max3)
//                                     console.log(`---------------------------`)
//                                     routes.push(route)
//                                 }))
//                             })
//                         }
//                     }))
//                 })
//             }
//         }))
//     })

//     var startO = Date.now()
//     var start = Date.now()
//     await Promise.all(wait)
//     console.log(`layer1 duration ${Date.now() - start}`)
//     start = Date.now()
//     await Promise.all(wait1)
//     console.log(`layer2 duration ${Date.now() - start}`)
//     start = Date.now()
//     await Promise.all(wait2)
//     console.log(`layer3 duration ${Date.now() - start}`)
//     console.log(`overall duration ${Date.now() - startO}`)

//     let max: Route = new Route(BigNumber.from(0))
//     routes.forEach(route => {
//         if (route.finalAmount.gt(max.finalAmount)) {
//             max = route
//         }
//     })
//     max.print()

//     return max
// }


function parallelSeparateRoutes() {
    
    tokenIns.forEach(async tin => {
        tokenOuts.forEach(async tout => {
            wsProvider.eth.subscribe('newBlockHeaders', async (error, event) => {
                console.log(`block: ${event.number}`)
                findOpAndDoArbitrage(flashAmountBN, tin, tout, 1)
            })
        })
    })
}
console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------')
parallelSeparateRoutes()
