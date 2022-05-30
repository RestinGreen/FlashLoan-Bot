import BN from "bn.js"
import { Contract } from 'web3-eth-contract';


export const getPriceOnUniV2 = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: BN,
    contract: Contract
): Promise<BN> => {

    // var start = Date.now()
    try {
        var price = await contract.methods.getAmountsOut(
            amountIn,
            [
                tokenIn,
                tokenOut
            ]
        ).call()
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
