import BigNumber from "bignumber.js"
import { Coin } from "../address/coin"
import { blacklist, updateMinimum } from "../database"
import { getAmountIn, getReserves } from "../price/mempoolscan"
import { getBN, ZERO } from "./general"

export async function getMinProfit(address: string): Promise<[string, boolean]> {
    const USDC = Coin.USDC
    const minUSDC = getBN(0.01, USDC.decimals)
    const WMATIC = Coin.WMATIC
    const minWMATIC = getBN(0.01, WMATIC.decimals)

    var blacklisted = false
    var minimum = "0"

    var [reserve0, reserve1, pair]: [BigNumber, BigNumber, string] = await getReserves(address, USDC.address, '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff')
    var [reserve00, reserve11, pair]: [BigNumber, BigNumber, string] = await getReserves(address, WMATIC.address, '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff')
    if (!reserve0.isZero() && !reserve00.isZero() && !reserve1.isZero() && !reserve11.isZero()) {
        let min1 = getAmountIn(reserve0, reserve1, minUSDC)
        let min2 = getAmountIn(reserve00, reserve11, minWMATIC)
        if (min1.gt(ZERO) || min2.gt(ZERO)) {
            if (min1.gt(min2)) {
                minimum = min1.toString(10)
            } else {
                minimum = min2.toString(10)
            }
        } else {
            blacklisted = true
        }
    } else {
        blacklisted = true
    }
    return [minimum, blacklisted]
}