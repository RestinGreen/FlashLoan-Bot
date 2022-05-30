import { BigNumber, Contract } from "ethers";
import { ZERO } from "../../utils/general";

export const getPriceOnUniV2Promise = (
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumber,
    contract: Contract
): Promise<[BigNumber, BigNumber]> => {

    var price = contract.callStatic.getAmountsOut(
        amountIn,
        [
            tokenIn,
            tokenOut
        ]
    )
    return price
}

export const getPriceOnUniV2 = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumber,
    contract: Contract
): Promise<BigNumber> => {

    // var start = Date.now()
    try {
        var price = await contract.getAmountsOut(
            amountIn,
            [
                tokenIn,
                tokenOut
            ]
        )
        return price[1]
    } catch (error) {
        console.error(`
        get price on UNISWAPV2 ${tokenIn} / ${tokenOut} / ${amountIn}
        -------------------------
        ${error}
        -------------------------`)
        process.exit(0)
        // return ZERO
    } finally {
        // console.log(Date.now() - start)
    }
}

