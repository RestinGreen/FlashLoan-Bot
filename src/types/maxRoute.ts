import { BigNumber, ethers } from "ethers"
import { IToken } from "../address/coin"

export type RouteNode = {
    tokenIn: IToken,
    tokenOut: IToken,
    amountBought: BigNumber,
    dex: string
}

export class Route {
    nodes: RouteNode[]

    finalAmount: BigNumber

    constructor(finalAmount: BigNumber) {
        this.nodes = []
        this.finalAmount = finalAmount
    }

    addNode(node: RouteNode) {
        this.nodes.push(node)
    }

    getLast(): RouteNode {
        return this.nodes[this.nodes.length]
    }

    print() {
        console.log()
        console.log()
        console.log(`-----------------MAX-----------------`)
        this.nodes.forEach( n => {
            console.log(`${n.dex}: ${n.tokenIn.symbol} -> ${n.tokenOut.symbol} = ${ethers.utils.formatUnits(n.amountBought, n.tokenOut.decimals)}`)
        })
        console.log(`-----------------MAX-----------------`)
        console.log()
        console.log()
    }
    
}
