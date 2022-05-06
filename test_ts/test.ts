import { ethers } from "ethers"
import { Coin } from "./address/coin"
import { getPriceOnDodoV2, ReturnType } from "./price/dodo/dodo"
import { getBigNumber } from "./utils/general"

async function test_test() {

    console.log('this is a test')

    var a = Coin.USDC
    var b = Coin.WMATIC
    var be = getBigNumber(100, a.decimals)

    var [type, promise] = getPriceOnDodoV2(a, b, be, '0x79bFB7407c4632C66dC9001b35f576f74a3069B6')

    var x = await promise
    console.log(x, type)
    switch (type) {
        case ReturnType.BASE_SOLD:
            console.log(ethers.utils.formatUnits(x.receiveQuoteAmount, b.decimals))
            break
        case ReturnType.QUOTE_SOLD:
            console.log(ethers.utils.formatUnits(x.receiveBaseAmount, b.decimals))
            break

    }
    process.exit(0)
}

test_test()


