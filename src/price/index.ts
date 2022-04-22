import { BigNumber, Contract, utils } from "ethers"
import { Protocol, protocols, ProtocolType, ProtocolTypeEnum } from "../address/router"
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
import QuoterV3 from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"
import { formatReadable, getBigNumber, providerHTTP, providerWSS } from "../utils/general"
import { getPriceOnUniV2 } from "./uniswapV2type"
import { getPriceOnUniV3 } from "./uniswapv3type"
import { Erc20Token, IToken } from "../address/coin"

type Amounts = {
    bought: Promise<BigNumber | [BigNumber, BigNumber]>,
    soldFor: BigNumber
};

type DisplayTable = {
    buy_from: string,
    sell_at: string,
    amount: string,
    tokenIn: string,
    tokenOut: string,
    bought: string,
    sell_for: string,
    profit: string
}

type Pair = {
    buy: string,
    sell: string
}

const createContracts = () => {
    var contracts: Map<string, Contract> = new Map<string, Contract>()
    Object.keys(protocols).forEach(key => {
        contracts.set(
            key,
            new Contract(
                protocols[key].address,
                protocols[key].type == 0 ? IUniswapV2Router02.abi : QuoterV3.abi,
                providerHTTP))

    }

    )
    return contracts
}

const contracts: Map<string, Contract> = createContracts()



const getBuySellPrice = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken, dex: string)
    : Promise<BigNumber | [BigNumber, BigNumber]> => {

    switch (protocols[dex].type) {
        case ProtocolTypeEnum.UNISWAP_V2:

            return getPriceOnUniV2(
                tokenIn.address,
                tokenOut.address,
                tokenAmount,
                contracts.get(dex)!)

        case ProtocolTypeEnum.UNISWAP_V3:
        default:

            return getPriceOnUniV3(
                tokenIn.address,
                tokenOut.address,
                tokenAmount,
                contracts.get(dex)!)
    }

}


export const getPriceAllDex = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken) => {

    const dexPair: Pair[] = []
    const buyDexType: ProtocolTypeEnum[] = []
    const dexContract = []
    //buying the token with loan money
    var amountOutPromise: Promise<BigNumber | [BigNumber, BigNumber]>[] = []
    var amountOutPrice = []
    var formatedAmountOutPrice: BigNumber[] = []
    //selling the bought token for profit
    var amountSellPromise: Promise<BigNumber | [BigNumber, BigNumber]>[] = []
    var amountSellPrice: (BigNumber | [BigNumber, BigNumber])[] = []

    Object.keys(protocols).forEach(buy => {
        Object.keys(protocols).forEach(sell => {
            if (buy != sell) {
                buyDexType.push(protocols[buy].type)
                dexContract.push(contracts.get(buy))
                dexPair.push({ buy: buy, sell: sell })

                amountOutPromise.push(getBuySellPrice(tokenAmount, tokenIn, tokenOut, buy))
            }
        })
    })

    var start = Date.now()
    amountOutPrice = await Promise.all(amountOutPromise)
    console.log(`time: ${Date.now() - start}`)

    var numberOfDex = Object.keys(protocols).length

    // var table: DisplayTable[] = []
    amountOutPrice.forEach((price: BigNumber | [BigNumber, BigNumber], index) => {
        //@ts-ignore
        formatedAmountOutPrice.push(buyDexType[index] == 0 ? price[1] : price)

    })

    const sellDexType: ProtocolTypeEnum[] = []
    for (let index = 0; index < numberOfDex * numberOfDex - numberOfDex; index++) {

        sellDexType.push(protocols[dexPair[index].sell].type)
        amountSellPromise.push(getBuySellPrice(formatedAmountOutPrice[index], tokenOut, tokenIn, dexPair[index].sell))
    }

    start = Date.now()
    amountSellPrice = await Promise.all(amountSellPromise)
    console.log(`time: ${Date.now() - start}`)

    var prev: BigNumber = tokenAmount.mul(-1)
    var temp: DisplayTable;
    amountOutPrice.forEach((price: BigNumber | [BigNumber, BigNumber], index) => {
        // @ts-ignore
        let bought: BigNumber = buyDexType[index] == 0 ? price[1] : price
        // @ts-ignore
        let sell_for: BigNumber = sellDexType[index] == 0 ? amountSellPrice[index][1] : amountSellPrice[index]

        let profit: BigNumber = sell_for.sub(tokenAmount)
        if (profit.gt(prev)) {
            prev = profit
            temp = {
                buy_from: dexPair[index].buy,
                sell_at: dexPair[index].sell,
                amount: utils.formatUnits(tokenAmount, tokenIn.decimals),
                tokenIn: tokenIn.symbol,
                tokenOut: tokenOut.symbol,
                bought: utils.formatUnits(bought, tokenOut.decimals),
                sell_for: utils.formatUnits(sell_for, tokenIn.decimals),
                profit: utils.formatUnits(profit, tokenIn.decimals)
            }    
        }

        // table.push({
        //     buy_from: dexPair[index].buy,
        //     sell_at: dexPair[index].sell,
        //     amount: utils.formatUnits(tokenAmount, tokenIn.decimals),
        //     tokenIn: tokenIn.symbol,
        //     tokenOut: tokenOut.symbol,
        //     bought: utils.formatUnits(bought, tokenOut.decimals),
        //     sell_for: utils.formatUnits(sell_for, tokenIn.decimals),
        //     profit: utils.formatUnits(profit, tokenIn.decimals)
        // }    )

    })


    // console.table(table)
    console.table(temp!)

















}