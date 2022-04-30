require('dotenv').config();

import { Coin, IToken } from "./address/coin";
import { dex_dict } from "./address/dex_data";
import { getBestPrice, getPriceAllDex } from "./price";
import { Graph, Node } from "./types/graph";
import { getBigNumber } from "./utils/general";


const routerTokens : IToken[] = [Coin.USDC, Coin.WETH, Coin.WBTC, Coin.WMATIC]

const buildGraph = (tokenIn: IToken, tokenOut: IToken) => {

    var graph: Graph = new Graph()

    var head: Node = graph.addNode(tokenIn)
    
    head.addEdgeTo(tokenOut, graph)
    
    routerTokens.forEach(rt1 => {
        if (rt1.symbol !== tokenIn.symbol && rt1.symbol !== tokenOut.symbol) {
            var layer1_node = head.addEdgeTo(rt1, graph)   

            layer1_node.addEdgeTo(tokenOut, graph)
            routerTokens.forEach(rt2 => {
                if (rt2.symbol !== tokenIn.symbol && rt2.symbol !== tokenOut.symbol 
                    && layer1_node.route.find(r => r.token.symbol==rt2.symbol)==undefined) {
                        var layer2_node = layer1_node.addEdgeTo(rt2, graph)
                        
                        var layer3_node = layer2_node.addEdgeTo(tokenOut, graph)
                }
            })
        }
    });
    
}

const main = async () => {


    var flashAmount = 3000
    var tokenIn = Coin.USDC
    var tokenOut = Coin.WETH
    var flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)


    // await getPriceAllDex(flashAmountBN, tokenIn, tokenOut)

    // await getBestPrice(flashAmountBN, tokenIn, tokenOut)

    buildGraph(tokenIn, tokenOut)
    




}

main().then(() => process.exit(0))
