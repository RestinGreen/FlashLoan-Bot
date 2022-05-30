// import { BigNumber, Contract, ethers } from "ethers";
// import { DODOPOOLS, Pool } from "./pools";
// import * as IDODOV2 from "../../abis/IDODOV2.json"
// import { provider } from "../../config";
// import { IToken } from "../../address/coin";



// function createDodoContracts(): Map<string, Contract> {

//     let contracts: Map<string, Contract> = new Map<string, Contract>()
//     DODOPOOLS.forEach((dodo: Pool) => {
//         let pair = dodo.pair.join()
//         contracts.set(pair, new Contract(dodo.address, IDODOV2.abi, provider))

//     })
//     return contracts
// }

// const dodoContracts: Map<string, Contract> = createDodoContracts()

// export type BaseSold = {
//     receiveQuoteAmount: BigNumber
// }
// export type QuoteSold = {
//     receiveBaseAmount: BigNumber
// }

// export enum ReturnType {
//     BASE_SOLD,
//     QUOTE_SOLD,
//     NULL
// }

// export const getPriceOnDodoV2 = (
//     tokenIn: IToken,
//     tokenOut: IToken,
//     amountIn: BigNumber,
//     flashloanContractAddress: String
// ): [ReturnType, Promise<any>] => {


//     var pair = tokenIn.symbol.concat(',', tokenOut.symbol)
//     var inversePair = tokenOut.symbol.concat(',', tokenIn.symbol)

//     var type: ReturnType = ReturnType.NULL

//     if (dodoContracts.get(pair) != undefined) {
//         type = ReturnType.BASE_SOLD
//         //@ts-ignore
//         let x = dodoContracts.get(pair)!.querySellBase(flashloanContractAddress, amountIn).catch(error => {
//             // console.log(error)
//         })
//         return [type, x]

//     } else {

//     // if (dodoContracts.get(inversePair) != undefined) {
//         type = ReturnType.QUOTE_SOLD
//         //@ts-ignore
//         let x = dodoContracts.get(inversePair)!.querySellQuote(flashloanContractAddress, amountIn).catch(error => {
//             })
//         return [type, x]
//     }

// }