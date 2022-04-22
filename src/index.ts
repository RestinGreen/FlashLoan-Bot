require('dotenv').config();

import { Coin } from "./address/coin";
import { getPriceAllDex } from "./price";
import { getBigNumber } from "./utils/general";


const main = async () => {

    var flashAmount = 4000
    var tokenIn = Coin.USDT
    var tokenOut = Coin.WETH
    var flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)

    var tokenOut2 = Coin.WMATIC

    var a = getPriceAllDex(flashAmountBN, tokenIn, tokenOut)
    var b = getPriceAllDex(flashAmountBN, tokenIn, tokenOut2)

    await Promise.all([b])    
}

main().then(() => process.exit(0))
