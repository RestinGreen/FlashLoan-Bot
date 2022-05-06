import { BigNumber, Contract } from "ethers";

export const getPriceOnUniV2 = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumber,
    contract: Contract
) : Promise<[BigNumber, BigNumber]> => {
    
    var price = contract.callStatic.getAmountsOut(
        amountIn,
        [
            tokenIn,
            tokenOut
        ]
    )
    return price
}