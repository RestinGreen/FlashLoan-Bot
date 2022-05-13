import { BigNumber } from "ethers"
import { DexType } from "../address/dex_data"

export type FlashParams = {
    buyAddress: string
    buyDexType: DexType
    
    sellAddress: string
    sellDexType: DexType

    buyAmount: BigNumber
}