import { BigNumber, ethers, providers } from "ethers"
import { Coin } from "../src/address/coin"
import { getPriceOnDodoV2, ReturnType } from "../src/price/dodo/dodo"
import { alchemyProviderHTTP, getBigNumber, localFork } from "../src/utils/general"
import { provider } from "../src/config"
const log = require("why-is-node-running")
require('dotenv').config();
// async function dodotest() {

//     console.log('this is a test')

//     var a = Coin.USDC
//     var b = Coin.WMATIC
//     var be = getBigNumber(100, a.decimals)

//     var [type, promise] = getPriceOnDodoV2(a, b, be, '0x79bFB7407c4632C66dC9001b35f576f74a3069B6')

//     var x = await promise
//     console.log(x, type)
//     switch (type) {
//         case ReturnType.BASE_SOLD:
//             console.log(ethers.utils.formatUnits(x.receiveQuoteAmount, b.decimals))
//             break
//         case ReturnType.QUOTE_SOLD:
//             console.log(ethers.utils.formatUnits(x.receiveBaseAmount, b.decimals))
//             break

//     }
//     process.exit(0)
// }

async function f1(a: number, b: number) {

    let x = Math.floor(Math.random()*3)*100
    await new Promise(f => setTimeout(f, x));
    console.log(a, b)
}


function asynctest() {
    console.log(`async test`)

    var be = [1, 2, 3, 4]
    var ki = [5, 6, 7, 8]

    be.forEach(async b => {
        ki.forEach(async k => {
            while(1)
                await f1(b,k)
        })
    })

}

asynctest()
// log()


