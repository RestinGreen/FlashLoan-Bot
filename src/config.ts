import { Coin } from "./address/coin"
import { alchemyProviderHTTP, ganacheFork, getBigNumber } from "./utils/general"

var flashAmount = 30000
export const tokenIn = Coin.USDC
export const tokenOut = Coin.WETH
export const flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)

//alchemyProviderHTTP
//ganacheFork
export const provider = alchemyProviderHTTP