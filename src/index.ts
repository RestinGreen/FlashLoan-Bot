require('dotenv').config();

import { Coin, IToken } from "./address/coin"
import { ipcProvider, tokenIns, tokenOuts, wsProvider } from "./config"
import { Graph, Node } from "./types/graph"
import { ethers } from "ethers"
import { RouteNode } from "./types/maxRoute"
import { scan } from "./price/mempoolscan"
import { RequestInfo, RequestInit } from "node-fetch"

const fetch = require("node-fetch")
const routerTokens: IToken[] = [Coin.USDC, Coin.WETH, Coin.WMATIC, Coin.USDT, Coin.DAI]

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


console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------')



function main() {

    scan()
}
main()