// import { BigNumber, Contract, ethers } from "ethers"
// import { dex_dict, DexType } from "../address/dex_data"
// import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
// import QuoterV3 from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"
// import { ZERO } from "../utils/general"
// import { getPriceOnUniV2Promise } from "./uniswapV2/uniswapV2type"
// import { getPriceOnUniV3Promise } from "./uniswapV3/uniswapv3type"
// import { Coin, IToken } from "../address/coin"
// import { forkJoin } from "rxjs"
// import { RouteNode as RouteNode } from "../types/maxRoute"
// import { provider } from "../config"



// const createContracts = () => {
//     var contracts: Map<string, Contract> = new Map<string, Contract>()
//     Object.entries(dex_dict).forEach(([key, value]) => {
//         contracts.set(
//             key,
//             new Contract(
//                 value.address,
//                 value.type == 0 ? IUniswapV2Router02.abi : QuoterV3.abi,
//                 provider))

//     }

//     )
//     return contracts
// }

// const contracts: Map<string, Contract> = createContracts()

// const getPrice = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken, dex: string)
//     : Promise<BigNumber | BigNumber[]> => {


//     switch (dex_dict[dex].type) {
//         case DexType.UNISWAP_V2:

//             return getPriceOnUniV2Promise(
//                 tokenIn.address,
//                 tokenOut.address,
//                 tokenAmount,
//                 contracts.get(dex)!)

//         case DexType.UNISWAP_V3:
//         default:

//             return getPriceOnUniV3Promise(
//                 tokenIn,
//                 tokenOut,
//                 tokenAmount,
//                 contracts.get(dex)!)
//     }

// }


// const parseResult = (result: BigNumber | BigNumber[], type: DexType): BigNumber => {

//     var parsed: BigNumber = ZERO

//     switch (type) {
//         case DexType.UNISWAP_V2:
//             //@ts-ignore
//             parsed = result[1]
//             break;
//         case DexType.UNISWAP_V3:
//             //@ts-ignore
//             parsed = result
//         default:
//             break;
//     }
//     return parsed


// }


// export async function getBestPriceAsync(tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken)
//     : Promise<RouteNode> {

//     var wait: Promise<BigNumber | BigNumber[] | void>[] = []
//     var prices: RouteNode[] = []


//     Object.entries(dex_dict).forEach(([key, value]) => {
//         var start = Date.now()
//         wait.push(getPrice(tokenAmount, tokenIn, tokenOut, key).then(result => {
//             let x = parseResult(result, value.type)
//             // console.log(key, ethers.utils.formatUnits(x, tokenOut.decimals), tokenOut.symbol, Date.now() - start)
//             prices.push({
//                 tokenIn: tokenIn,
//                 tokenOut: tokenOut,
//                 amountBought: x,
//                 dex: key
//             })

//         }).catch(error => {
//             // console.log(`error with dex ${key} ${tokenIn.symbol} / ${tokenOut.symbol}`)
//         }))
//     })

//     await Promise.all(wait)
//     // console.log(prices)

//     var max: RouteNode = {
//         tokenIn: tokenIn,
//         tokenOut: tokenOut,
//         amountBought: BigNumber.from(0),
//         dex: ""
//     }

//     prices.forEach(p => {
//         if (p.amountBought.gt(max.amountBought)) {
//             max = p
//         }
//     })
//     // console.log(max)

    
//     return max

// }