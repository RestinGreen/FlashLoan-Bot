import { Coin } from "./address/coin"
import { alchemyProviderHTTP, localFork, getBigNumber } from "./utils/general"

var flashAmount = 3000
export const tokenIn = Coin.USDC
export const tokenOut = Coin.WETH
export const flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)

export const tokenIns = [Coin.USDC]
export const tokenOuts =  [Coin.WETH, Coin.WBTC, Coin.WMATIC]

//alchemyProviderHTTP
//localFork                 ebbe a blockba van profit az en botommal 27988982
//npx hardhat node --fork https://polygon-mainnet.g.alchemy.com/v2/kLQlGBCvwKLhyFtlglA117qDFHjxURUD --fork-block-number 27988982
export const provider = alchemyProviderHTTP