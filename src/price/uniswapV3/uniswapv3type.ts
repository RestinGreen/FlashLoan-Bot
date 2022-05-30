import { BigNumber, Contract } from "ethers";
import { IToken } from "../../address/coin";
import { getBigNumber, ZERO } from "../../utils/general";

type FeeMap = {
    [pair: string]: {
        [pair: string]: number;
    };
};


export const getPriceOnUniV3Promise = (
    tokenIn: IToken,
    tokenOut: IToken,
    amountIn: BigNumber,
    contract: Contract
): Promise<BigNumber> => {

    try {
        var fee = uniswapV3Fee[tokenIn.symbol][tokenOut.symbol]
    } catch (error) {
        var fee = 3000
    }

    var quotedAmountOut = contract.callStatic.quoteExactInputSingle(
        tokenIn.address,
        tokenOut.address,
        fee,
        amountIn,
        0
    );
    // if (!BigNumber.isBigNumber(quotedAmountOut)) {
    //     return getBigNumber(0);
    // }
    return quotedAmountOut;
};

export const getPriceOnUniV3 = async (
    tokenIn: IToken,
    tokenOut: IToken,
    amountIn: BigNumber,
    contract: Contract
): Promise<BigNumber> => {

    try {
        var fee = uniswapV3Fee[tokenIn.symbol][tokenOut.symbol]
    } catch (error) {
        var fee = 3000
    }
    try {
        let price = await contract.callStatic.quoteExactInputSingle(
            tokenIn.address,
            tokenOut.address,
            fee,
            amountIn,
            0
        )
        return price
    } catch (error) {
        console.error(`
        get price on UNISWAPV3 error 
        -------------------------
        ${error}
        -------------------------`)
        return ZERO
    }
};

export const uniswapV3Fee: FeeMap = {
    USDC: {
        WETH: 500,
        WMATIC: 500,
        WBTC: 3000,
    },
    WETH: {
        USDC: 500,
    },
    WMATIC: {
        USDC: 500,
    },
    WBTC: {
        USDC: 3000,
    }
}

