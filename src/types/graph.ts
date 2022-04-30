import { IToken } from "../address/coin"

export class Edge {
    from: Node
    to: Node

    constructor(from: Node, to: Node) {
        this.from = from
        this.to = to
    }
}
export class Graph {

    nodeNr: number
    nodes: Map<number, Node> = new Map<number, Node>()

    constructor() {
        this.nodeNr = 0
    }

    addNode(newToken: IToken): Node {
        var node = new Node(newToken, this.nodeNr)
        this.nodes.set(this.nodeNr, node)
        this.nodeNr++

        return node
    }
}

export class Node {
    
    id: number
    token: IToken
    neighbours: Map<number, Node> = new Map<number, Node>() //szomszedok
    edge: Edge[] = []   //elek
    route: Node[] = []  //utvonal

    constructor(token: IToken, index: number) {
        this.token = token
        this.id = index
        
    }

    addEdgeTo(toToken: IToken, graph: Graph): Node {

        var toNode: Node = graph.addNode(toToken)
        this.route.forEach(r => toNode.route.push(r))
        toNode.route.push(this)
        toNode.route.push(toNode)


        var edge: Edge = new Edge(this, toNode)
        this.edge.push(edge)
        this.neighbours.set(toNode.id, toNode)

        return toNode
    }
}
