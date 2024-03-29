import BigNumber from "bignumber.js"
import { DexType } from "../address/dex_data"

export type FlashParams = {
    //this is the address
    tokenIn: string
    //this is the address
    tokenOut: string
    buyDexType: DexType
    sellDexType: DexType
    buyDexAddress: string
    sellDexAddress: string
    buyAmount: BigNumber
    flashLoanPool: string
}