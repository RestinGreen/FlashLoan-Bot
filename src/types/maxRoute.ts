import { BigNumber } from "ethers"
import { IToken } from "../address/coin"

export type MaxRoute = {
    tokenIn: string,
    tokenOut: string,
    amountBought: BigNumber
}
