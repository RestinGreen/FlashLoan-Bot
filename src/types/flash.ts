import { BigNumber } from "ethers"
import { DexType } from "../address/dex_data"

export type FlashParams = {
    buyAddress: string
    sellAddress: string
    buyDex: DexType
    sellDex: DexType
    buyAmount: number
    flashLoanPool: string
}