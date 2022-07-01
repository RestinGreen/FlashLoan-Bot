import { Coin, IToken } from "../address/coin"
import { DexType, dex_dict } from "../address/dex_data"


export type Node = {
    token: IToken
    dexAddress: string
    dexType: DexType
    dexName: string
}

export const nodes: Node[] = createNodes()

function createNodes(): Node[] {
    
    var routeTokens: IToken[] = [Coin.USDC, Coin.WMATIC, Coin.WETH, Coin.DAI, Coin.USDT]
    
    var returnList: Node[] = []
    
    routeTokens.forEach(token => {
        Object.keys(dex_dict).forEach(dex => {
            returnList.push({
                token: token,
                dexAddress: dex_dict[dex].router,
                dexType: dex_dict[dex].type,
                dexName: dex
            })
        })
    })
    
    
    return returnList
}

export type Route = {
    nodes: Node[]
}

function createRoutes(): Route[] {

    var routes: Route[] = []

    nodes.forEach(n1 => {
        nodes.forEach(n2 => {
            if (n1.dexAddress != n2.dexAddress && n1.token.address != n2.token.address) {
                routes.push({
                    nodes: [n1, n2]
                })
            }
        })
    })

    return routes
}
export const routes: Route[] = createRoutes()