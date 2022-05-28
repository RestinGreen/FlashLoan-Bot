import { Coin } from "../src/address/coin"
import { getPriceAllDex } from "../src/price/direct_price_index"
import { getBigNumber } from "../src/utils/general"
import { dodo_flashloan_pools } from "../src/address/flashloan_pool"
import { provider } from "../src/config";
import { ethers } from "ethers";
import { FlashParams } from "../src/types/flash"
import { dex_dict } from "../src/address/dex_data"
import { flashAmountBN, testFlashloan, signer } from "../src/config"
import * as usdcAbi from "../src/abis/USDC.json"

require('dotenv').config()

const log = require("why-is-node-running")


async function asynctest() {
    console.log(`async test`)

    const USDC = new ethers.Contract('0x2791bca1f2de4661ed88a30c99a7a9449aa84174', usdcAbi.abi, provider)

    var amount = 3000
    var coinA = Coin.USDC
    var coinB = Coin.WMATIC
    var amountBN = getBigNumber(3000, Coin.USDC.decimals)

    var [profitable, route] = await getPriceAllDex(amountBN, coinA, coinB)

    if (profitable) {
        console.log(`initating flash loan`)

        console.log(`usdc before flashsloan: ${await USDC.balanceOf(signer.address)}`)

        const gasPrice = await provider.getGasPrice();
        const extraGas = ethers.utils.parseUnits("20", "gwei");

        var flashpool: string = dodo_flashloan_pools[coinA.symbol]

        var params: FlashParams = {
            tokenIn: coinA.address,
            tokenOut: coinB.address,
            buyDexType: dex_dict[route.buy_from].type,
            sellDexType: dex_dict[route.sell_at].type,
            buyDexAddress: dex_dict[route.buy_from].address,
            sellDexAddress: dex_dict[route.sell_at].address,
            buyAmount: amount,
            flashLoanPool: flashpool
        }

        console.log('gas price', ethers.utils.formatUnits(gasPrice, 'gwei'))

        const estimagedGas = await testFlashloan.estimateGas.dodoFlashLoan(params)

        // 0.000000067 = 67 gwei
        // 0.000000001 = 1  gwei
        console.log(`estimated gas is: ${estimagedGas}`)

        await testFlashloan.connect(signer).dodoFlashLoan(params
            ,
            {
                gasLimit: 15000000,
                gasPrice: gasPrice.add(extraGas),
            })
        // await dodoexample.connect(signer).dodoFlashLoan(flashpool, 3000, coinA.address)
        console.log(`usdc after flashloan ${await USDC.balanceOf(signer.address)}`)
    }
    var start = Date.now()
    var height = await provider.getBlockNumber()
    console.log(Date.now()-start)
    console.log(height)

}
function gas() {
    console.log(ethers.utils.formatUnits('98004002052', 'gwei'))
}

function date() {
    while(1) {
        var date: Date = new Date()
        console.log(date)
    }
}

function ws() {
    var ws = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8546')

    var prev = Date.now()
    ws.on('block', async (blockNumber) => {
        var now = Date.now()
        console.log(`New Block: ${blockNumber} validated in: ${now-prev} ms`);
        prev = now

        var amount = 3000
        var coinA = Coin.USDC
        var coinB = Coin.WMATIC
        var amountBN = getBigNumber(3000, Coin.USDC.decimals)
    
        var [profitable, route] = await getPriceAllDex(amountBN, coinA, coinB)


      });
}

ws()
// log()


