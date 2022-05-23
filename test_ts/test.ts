import { Coin } from "../src/address/coin"
import { getPriceAllDex } from "../src/price/direct_price_index"
import { getBigNumber } from "../src/utils/general"
import { dodo_flashloan_pools } from "../src/address/flashloan_pool"
import { dodoexample, provider } from "../src/config";
import { ethers } from "ethers";
import { FlashParams } from "../src/types/flash"
import { dex_dict } from "../src/address/dex_data"
import { flashAmountBN, flashLoan, signer } from "../src/config"
require('dotenv').config()

const log = require("why-is-node-running")


async function asynctest() {
    console.log(`async test`)

    // var amount = 3000
    // var coinA = Coin.USDC
    // var coinB = Coin.WMATIC
    // var amountBN = getBigNumber(3000, Coin.USDC.decimals)

    // var [profitable, route] = await getPriceAllDex(amountBN, coinA, coinB)

    // if (profitable) {
    //     console.log(`initating flash loan`)
        
    //     const gasPrice = await provider.getGasPrice();
    //     const extraGas = ethers.utils.parseUnits("100", "gwei");

    //     var flashpool: string = dodo_flashloan_pools[coinA.symbol]

    //     var params: FlashParams = {
    //         buyAddress: coinA.address,
    //         sellAddress: coinB.address,
    //         buyDex: dex_dict[route.buy_from].type,
    //         sellDex: dex_dict[route.sell_at].type,
    //         buyAmount: amount,
    //         flashLoanPool: flashpool
    //     }
        
    //     console.log(ethers.utils.formatUnits(gasPrice, 'gwei'))
    //     console.log('buy address',params.buyAddress)
    //     console.log('sell address',params.sellAddress)

    //     await flashLoan.connect(signer).dodoFlashLoan(params)
        // await dodoexample.connect(signer).dodoFlashLoan(flashpool, 3000, coinA.address)
    // }
    var height = await provider.getBlockNumber()
    console.log(height)

}

asynctest()
// log()


