import { BigNumber, Contract, utils } from "ethers"
import { Dex, dex_dict, DexData, DexType } from "../address/dex_data"
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
import QuoterV3 from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"
import { getBigNumber, ZERO } from "../utils/general"
import { getPriceOnUniV2 } from "./uniswapV2/uniswapV2type"
import { getPriceOnUniV3 } from "./uniswapV3/uniswapv3type"
import { Coin, Erc20Token, IToken } from "../address/coin"
import { RouteNode } from "../types/maxRoute"
import { provider } from "../config"

type Amounts = {
    bought: Promise<BigNumber | [BigNumber, BigNumber]>,
    soldFor: BigNumber
};

type DisplayTable1 = {
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

const createContracts1 = () => {
    var contracts: Map<string, Contract> = new Map<string, Contract>()
    Object.entries(dex_dict).forEach(([key, value]) => {
        contracts.set(
            key,
            new Contract(
                value.address,
                value.type == 0 ? IUniswapV2Router02.abi : QuoterV3.abi,
                provider))

    }

    )
    return contracts
}

const contracts1: Map<string, Contract> = createContracts1()



const getPrice1 = (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken, dex: string)
    : Promise<BigNumber | [BigNumber, BigNumber] | void> => {

    switch (dex_dict[dex].type) {
        case DexType.UNISWAP_V2:

            return getPriceOnUniV2(
                tokenIn.address,
                tokenOut.address,
                tokenAmount,
                contracts1.get(dex)!).catch(error => {
                    console.error(`get price on UNISWAPV2 error`)
                })
        case DexType.UNISWAP_V3:
        default:
            return getPriceOnUniV3(
                tokenIn,
                tokenOut,
                tokenAmount,
                contracts1.get(dex)!).catch(error => {
                    console.error(`get price on UNISWAPV2 error`)
                })
    }

}

export type MaxRoute = {
    buy_from: string,
    sell_at: string,
    amount: BigNumber,
    tokenIn: string,
    tokenOut: string,
    bought: BigNumber,
    sell_for: BigNumber,
    profit: BigNumber
}

export const getPriceAllDex = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken, log: boolean = false)
    : Promise<[boolean, MaxRoute]> => {



    const dexPair: Pair[] = []
    const buyDexType: DexType[] = []
    const dexContract = []
    //buying the token with loan money
    var amountOutPromise: Promise<BigNumber | [BigNumber, BigNumber] | void>[] = []
    var amountOutPrice = []
    var formatedAmountOutPrice: BigNumber[] = []
    //selling the bought token for profit
    var amountSellPromise: Promise<BigNumber | [BigNumber, BigNumber] | void>[] = []
    var amountSellPrice: (BigNumber | [BigNumber, BigNumber] | void)[] = []

    Object.keys(dex_dict).forEach(buy => {
        Object.keys(dex_dict).forEach(sell => {
            if (buy != sell) {
                buyDexType.push(dex_dict[buy].type)
                dexContract.push(contracts1.get(buy))
                dexPair.push({ buy: buy, sell: sell })

                amountOutPromise.push(getPrice1(tokenAmount, tokenIn, tokenOut, buy))
            }
        })
    })

    var start = Date.now()
    amountOutPrice = await Promise.all(amountOutPromise)
    // console.log(`time: ${Date.now() - start} - ${tokenIn.symbol} / ${tokenOut.symbol} buy`)

    var numberOfDex = Object.keys(dex_dict).length

    amountOutPrice.forEach((price: BigNumber | [BigNumber, BigNumber] | void, index) => {
        //@ts-ignore
        formatedAmountOutPrice.push(buyDexType[index] == 0 ? price[1] : price)
    })

    const sellDexType: DexType[] = []
    for (let index = 0; index < numberOfDex * numberOfDex - numberOfDex; index++) {

        sellDexType.push(dex_dict[dexPair[index].sell].type)
        amountSellPromise.push(getPrice1(formatedAmountOutPrice[index], tokenOut, tokenIn, dexPair[index].sell))
    }

    start = Date.now()
    amountSellPrice = await Promise.all(amountSellPromise,)
    // console.log(`time: ${Date.now() - start} - ${tokenIn.symbol} / ${tokenOut.symbol} sell`)

    var max: MaxRoute = {
        buy_from: "",
        sell_at: "",
        amount: ZERO,
        tokenIn: "",
        tokenOut: "",
        bought: ZERO,
        sell_for: ZERO,
        profit: tokenAmount.mul(-1)
    }

    amountOutPrice.forEach((price: BigNumber | [BigNumber, BigNumber] | void, index) => {
        // @ts-ignore
        let bought: BigNumber = buyDexType[index] == 0 ? price[1] : price
        // @ts-ignore
        let sell_for: BigNumber = sellDexType[index] == 0 ? amountSellPrice[index][1] : amountSellPrice[index]

        let profit: BigNumber = sell_for.sub(tokenAmount)
        if (profit.gt(max.profit)) {
            max = {
                buy_from: dexPair[index].buy,
                sell_at: dexPair[index].sell,
                amount: tokenAmount,
                tokenIn: tokenIn.symbol,
                tokenOut: tokenOut.symbol,
                bought: bought,
                sell_for: sell_for,
                profit: profit
            }
        }


    })

    if (log) {
        console.table(max)
    }
    if (max.profit.gt(0)) {
        console.log(`block number: ${await provider.getBlockNumber().catch(error => console.error(`can't get block number`))}`)
        console.table({
            buy_from: max.buy_from,
            sell_at: max.sell_at,
            amount: utils.formatUnits(max.amount, tokenIn.decimals),
            tokenIn: tokenIn.symbol,
            tokenOut: tokenOut.symbol,
            bought: utils.formatUnits(max.bought, tokenOut.decimals),
            sell_for: utils.formatUnits(max.sell_for, tokenIn.decimals),
            profit: utils.formatUnits(max.profit, tokenIn.decimals)
        })
        return [true, max]
    }

    return [false, max]






}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


type DisplayTable = {
    amount: string,
    in: string,
    out: string,
    dex: string,
    price: string
}

type Route = {
    tokenin_address: string,
    tokenin_symbol: string,
    token_out_address: string,
    token_out_symbol: string,
}

const createContracts = () => {
    var contracts: Map<string, Contract> = new Map<string, Contract>()
    Object.entries(dex_dict).forEach(([key, value]) => {
        contracts.set(
            key,
            new Contract(
                value.address,
                value.type == 0 ? IUniswapV2Router02.abi : QuoterV3.abi,
                provider))

    }

    )
    return contracts
}

const contracts: Map<string, Contract> = createContracts()

const getPrice = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken, dex: string)
    : Promise<BigNumber | BigNumber[]> => {


    switch (dex_dict[dex].type) {
        case DexType.UNISWAP_V2:

            return getPriceOnUniV2(
                tokenIn.address,
                tokenOut.address,
                tokenAmount,
                contracts.get(dex)!)

        case DexType.UNISWAP_V3:
        default:

            return getPriceOnUniV3(
                tokenIn,
                tokenOut,
                tokenAmount,
                contracts.get(dex)!)
    }

}

const parsePromiseResult = (array: (BigNumber | BigNumber[])[], typeOrder: DexType[]) => {

    var parsed: BigNumber[] = []

    array.forEach((element: BigNumber | BigNumber[], index) => {

        switch (typeOrder[index]) {
            case DexType.UNISWAP_V2:
                //@ts-ignore
                parsed.push(element[1])
                break;
            case DexType.UNISWAP_V3:
                //@ts-ignore
                parsed.push(element)
            default:
                break;
        }
    });

    return parsed

}


export const getBestPrice = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken) => {




    var promises: Promise<BigNumber | BigNumber[]>[] = []
    var dex_type_order: DexType[] = []
    var dex_name_order: string[] = []

    Object.entries(dex_dict).forEach(([key, value]) => {

        promises.push(getPrice(tokenAmount, tokenIn, tokenOut, key))
        dex_type_order.push(value.type)
        dex_name_order.push(key)
    })



    var start = Date.now()
    var layer0_responses = await Promise.all(promises)
    var duration = Date.now() - start

    console.log(duration)
    console.log(layer0_responses)
    var parsed = parsePromiseResult(layer0_responses, dex_type_order)

    var table: DisplayTable[] = []

    var max: RouteNode = {
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        amountBought: getBigNumber(0, tokenOut.decimals),
        dex: ""
    }

    parsed.forEach((price: BigNumber, index) => {
        table.push(
            {
                amount: utils.formatUnits(tokenAmount, tokenIn.decimals).toString(),
                in: tokenIn.symbol,
                out: tokenOut.symbol,
                dex: dex_name_order[index],
                price: utils.formatUnits(price, tokenOut.decimals)
            })
        if (price.gt(max.amountBought)) {
            max = {
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                amountBought: price,
                dex: dex_name_order[index]

            }
        }
    })
    console.table(table)
    console.log(max.amountBought.toString())


}