import { BigNumber, Contract } from "ethers";
import { getBigNumber } from "../utils/general";

type FeeMap = {
    [pair: string]: {
      [pair: string]: number;
    };
  };
  

export const getPriceOnUniV3 = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumber,
    contract: Contract
): Promise<BigNumber> => {

    try {
        var fee = uniswapV3Fee[tokenIn][tokenOut]
    } catch(error) {
        var fee = 3000
    }

    var quotedAmountOut = contract.callStatic.quoteExactInputSingle(
        tokenIn,
        tokenOut,
        fee,
        amountIn,
        0
    );
    // if (!BigNumber.isBigNumber(quotedAmountOut)) {
    //     return getBigNumber(0);
    // }
    return quotedAmountOut;
};

export const uniswapV3Fee: FeeMap = {
    USDC: {
      WETH: 500,
    },
    WETH: {
        USDC: 500,
    }
}

