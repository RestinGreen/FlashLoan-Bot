import { Coin } from "./address/coin"
import { alchemyProviderHTTP, ganacheFork, getBigNumber } from "./utils/general"

var flashAmount = 3000
export const tokenIn = Coin.DAI
export const tokenOut = Coin.WETH
export const flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)

export const tokenIns = [Coin.USDC]
export const tokenOuts = [Coin.WMATIC, Coin.WBTC, Coin.WETH]

//alchemyProviderHTTP
//ganacheFork
export const provider = alchemyProviderHTTP