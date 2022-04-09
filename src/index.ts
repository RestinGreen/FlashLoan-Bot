require('dotenv').config();

import { ethers, utils, BigNumber } from "ethers";
import { abi as QuoterV3 } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import { Coin } from "./address/coin";
import { protocols } from "./address/router";
import { getPriceAllDex } from "./price";
import { getBigNumber, providerWSS } from "./utils/general";





// const checkArbitrage = async(loanAmount, dex1, dex2, token1, token2) => {

// }



const main = async () => {

    var flashAmount = 4000
    var tokenIn = Coin.USDC
    var tokenOut = Coin.WETH

   
    var flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)

    getPriceAllDex(flashAmountBN, tokenIn, tokenOut)

    // var opurtunityMatrix = 
    // provider.on('block', () => {
    //     provider.getBlockNumber().then(async nr => {

    //         // console.log(`block number: ${nr}`)
    //         console.log(`flashloan amount: ${flashAmount}`)

    //         const weth_usdc_sushi = await routerV2.getAmountsOut(
    //             getBigNumber(flashAmount, Coin.USDC.decimals), 
    //             [
    //                 Coin.USDC.address,
    //                 Coin.WETH.address
    //             ]
                
    //         );
            
    //         console.log(`quick: ${formatReadable(weth_usdc_sushi[1], Coin.WETH.decimals)}`)

    //         const weth_usdc_v3 = await getPriceOnUniV3(
    //             Coin.WETH.address,
    //             Coin.USDC.address,
    //             // getBigNumber(1, Coin.WETH.decimals),
    //             weth_usdc_sushi[1],
    //             500
    //         )
            
    //         console.log(`univ3: ${formatReadable(weth_usdc_v3, Coin.USDC.decimals)}\n`)
            
    //         let profit: BigNumber = weth_usdc_v3.sub(getBigNumber(flashAmount, Coin.USDC.decimals))
    //         if (profit > BigNumber.from(0)) {
    //             console.log(`\x1b[32mEXECUTING FLASH LOAN. Profit: ${profit}\x1b[0m`)
    //         }
            
    //     })
    //         .catch(e => {
    //             console.log(e)
    //         })
    // })

    // while (1) {
    //     var start = Date.now()
    //     var weth_usdc = await getPriceOnUniV3(
    //         '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',//weth
    //         '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',//udc
    //         getBigNumber(1),
    //         500
    //     )
    //     var block = await provider.getBlockNumber()
    //     console.log(`block: ${block} price: ${weth_usdc} time: ${Date.now() - start}`)
    // }


}

main()
