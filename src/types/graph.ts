import { BigNumber } from "ethers"
import { IToken } from "../address/coin"
import { ZERO } from "../utils/general"

export class Edge {
    from: Node
    to: Node
    dex: string
    amountFrom: BigNumber
    amountTo: BigNumber

    constructor(from: Node, to: Node) {
        this.from = from
        this.to = to
        this.dex = ""
        this.amountFrom = BigNumber.from(0)
        this.amountTo = BigNumber.from(0)
    }
}
export class Graph {

    nodeNr: number
    nodes: Map<number, Node> = new Map<number, Node>()

    constructor() {
        this.nodeNr = 0
    }

    addNode(newToken: IToken, layer: number): Node {
        var node = new Node(newToken, this.nodeNr, layer)
        this.nodes.set(this.nodeNr, node)
        this.nodeNr++

        return node
    }
}

export class Node {
    
    id: number
    token: IToken
    neighbours: Node[] = []
    edge: Edge[] = []   //elek
    route: Node[] = []  //utvonal
    layer: number

    constructor(token: IToken, index: number, layer: number) {
        this.token = token
        this.id = index
        this.layer = layer
    }

    addEdgeTo(toToken: IToken, graph: Graph, layer: number): Node {

        var toNode: Node = graph.addNode(toToken, layer)
        this.route.forEach(r => toNode.route.push(r))
        toNode.route.push(this)
        toNode.route.push(toNode)


        var edge: Edge = new Edge(this, toNode)
        this.edge.push(edge)
        this.neighbours.push(toNode)

        return toNode
    }
}
