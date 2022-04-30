import { BigNumber, Contract, utils } from "ethers"
import { Dex, dex_dict, DexData, DexType } from "../address/dex_data"
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
import QuoterV3 from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"
import { alchemyProviderHTTP, getBigNumber } from "../utils/general"
import { getPriceOnUniV2 } from "./uniswapV2type"
import { getPriceOnUniV3 } from "./uniswapv3type"
import { Coin, Erc20Token, IToken } from "../address/coin"
import { id, parseUnits } from "ethers/lib/utils"
import { MaxRoute } from "../types/maxRoute"

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
                alchemyProviderHTTP))

    }

    )
    return contracts
}

const contracts1: Map<string, Contract> = createContracts1()



const getPrice1 = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken, dex: string)
    : Promise<BigNumber | [BigNumber, BigNumber]> => {

    switch (dex_dict[dex].type) {
        case DexType.UNISWAP_V2:

            return getPriceOnUniV2(
                tokenIn.address,
                tokenOut.address,
                tokenAmount,
                contracts1.get(dex)!)

        case DexType.UNISWAP_V3:
        default:

            return getPriceOnUniV3(
                tokenIn,
                tokenOut,
                tokenAmount,
                contracts1.get(dex)!)
    }

}


export const getPriceAllDex = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken) => {

    const dexPair: Pair[] = []
    const buyDexType: DexType[] = []
    const dexContract = []
    //buying the token with loan money
    var amountOutPromise: Promise<BigNumber | [BigNumber, BigNumber]>[] = []
    var amountOutPrice = []
    var formatedAmountOutPrice: BigNumber[] = []
    //selling the bought token for profit
    var amountSellPromise: Promise<BigNumber | [BigNumber, BigNumber]>[] = []
    var amountSellPrice: (BigNumber | [BigNumber, BigNumber])[] = []

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
    console.log(`time: ${Date.now() - start}`)

    var numberOfDex = Object.keys(dex_dict).length

    var table: DisplayTable1[] = []
    amountOutPrice.forEach((price: BigNumber | [BigNumber, BigNumber], index) => {
        //@ts-ignore
        formatedAmountOutPrice.push(buyDexType[index] == 0 ? price[1] : price)
    })

    const sellDexType: DexType[] = []
    for (let index = 0; index < numberOfDex * numberOfDex - numberOfDex; index++) {

        sellDexType.push(dex_dict[dexPair[index].sell].type)
        amountSellPromise.push(getPrice1(formatedAmountOutPrice[index], tokenOut, tokenIn, dexPair[index].sell))
    }

    start = Date.now()
    amountSellPrice = await Promise.all(amountSellPromise)
    console.log(`time: ${Date.now() - start}`)

    var prev: BigNumber = tokenAmount.mul(-1)
    var temp: DisplayTable1;
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

        table.push({
            buy_from: dexPair[index].buy,
            sell_at: dexPair[index].sell,
            amount: utils.formatUnits(tokenAmount, tokenIn.decimals),
            tokenIn: tokenIn.symbol,
            tokenOut: tokenOut.symbol,
            bought: utils.formatUnits(bought, tokenOut.decimals),
            sell_for: utils.formatUnits(sell_for, tokenIn.decimals),
            profit: utils.formatUnits(profit, tokenIn.decimals)
        })

    })


    console.table(table)
    console.table(temp!)







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
                alchemyProviderHTTP))

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

    // 0 hop - direct swap    |  1 hop                  |     2 hop
    //--------------------------------------------------------------------------------------|
    // A -> B = A/B           |  A -> B = A/C -> C/B.   |     A -> B = A/C -> C/D -> D/B    | 
    // sell A for B           |  sell A for C           |     sell A for C                  | 1. blockchain call
    //                        |  sell C for A           |     sell C for D                  | 2. blockchain call
    //                        |                         |     sell D for B                  | 3. blockchain call
    // -------------------------------------------------------------------------------------


    // 4 router tokens
    // - USDC
    // - WETH
    // - WBTC
    // - WMATIC

    var layer0_promises: Promise<BigNumber | BigNumber[]>[] = []
    var layer0_dex_type_order: DexType[] = []

    var hop0_promises: Promise<BigNumber | BigNumber[]>[] = []
    var hop0_dex_type_order: DexType[] = []
    var hop0_dex_name_order: string[] = []

    Object.entries(dex_dict).forEach(([key, value]) => {

        hop0_promises.push(getPrice(tokenAmount, tokenIn, tokenOut, key))
        hop0_dex_type_order.push(value.type)
        hop0_dex_name_order.push(key)
    })

    var hop1_promises: Promise<BigNumber | BigNumber[]>[] = []
    var hop1_dex_type_order: DexType[] = []
    var hop1_dex_name_order: string[] = []

    if (tokenIn.symbol !== Coin.WETH.symbol && tokenOut.symbol !== Coin.WETH.symbol) {
        Object.entries(dex_dict).forEach(([key, value]) => {
            hop1_promises.push(getPrice(tokenAmount, tokenIn, Coin.WETH, key))
            hop1_dex_type_order.push(value.type)
            hop1_dex_name_order.push(key)
        })
    }

    if (tokenIn.symbol !== Coin.USDC.symbol && tokenOut.symbol !== Coin.USDC.symbol) {
        Object.entries(dex_dict).forEach(([key, value]) => {
            hop1_promises.push(getPrice(tokenAmount, tokenIn, Coin.USDC, key))
            hop1_dex_type_order.push(value.type)
            hop1_dex_name_order.push(key)
        })
    }

    if (tokenIn.symbol !== Coin.WBTC.symbol && tokenOut.symbol !== Coin.WBTC.symbol) {
        Object.entries(dex_dict).forEach(([key, value]) => {
            hop1_promises.push(getPrice(tokenAmount, tokenIn, Coin.WBTC, key))
            hop1_dex_type_order.push(value.type)
            hop1_dex_name_order.push(key)
        })
    }

    if (tokenIn.symbol !== Coin.WMATIC.symbol && tokenOut.symbol !== Coin.WMATIC.symbol) {
        Object.entries(dex_dict).forEach(([key, value]) => {
            hop1_promises.push(getPrice(tokenAmount, tokenIn, Coin.WMATIC, key))
            hop1_dex_type_order.push(value.type)
            hop1_dex_name_order.push(key)
        })
    }

    layer0_promises = hop0_promises.concat(hop1_promises)
    layer0_dex_type_order = hop0_dex_type_order.concat(hop1_dex_type_order)
    

    var start = Date.now()
    var layer0_responses = await Promise.all(layer0_promises)
    var duration = Date.now() - start
    
    console.log(duration)
    console.log(layer0_responses)
    var parsed = parsePromiseResult(layer0_responses, layer0_dex_type_order)

    var table: DisplayTable[] = []

    var max: MaxRoute = {
        tokenIn: "",
        tokenOut: "",
        amountBought: getBigNumber(0, tokenOut.decimals),
    }

    parsed.forEach((price: BigNumber, index) => {
        table.push(
            {
                amount: utils.formatUnits(tokenAmount, tokenIn.decimals).toString(),
                in: tokenIn.symbol,
                out: tokenOut.symbol,
                dex: hop0_dex_name_order[index],
                price: utils.formatUnits(price, tokenOut.decimals)
            })
        if (price.gt(max.amountBought)) {
            max = {
                tokenIn: tokenIn.address,
                tokenOut: tokenOut.address,
                amountBought: price,
            }
        }
    })
    console.table(table)
    console.log(max.amountBought.toString())


}