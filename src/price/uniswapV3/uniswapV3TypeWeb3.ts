import BN from "bn.js";
import { Contract } from 'web3-eth-contract';
import { IToken } from "../../address/coin";
import { getBigNumber, ZERO, ZEROO } from "../../utils/general";

type FeeMap = {
    [pair: string]: {
        [pair: string]: number;
    };
};


export const getPriceOnUniV3 = async (
    tokenIn: IToken,
    tokenOut: IToken,
    amountIn: BN,
    contract: Contract
): Promise<BN> => {

    try {
        var fee = uniswapV3Fee[tokenIn.symbol][tokenOut.symbol]
    } catch (error) {
        var fee = 3000
    }
    try {
        let price = await contract.methods.quoteExactInputSingle(
            tokenIn.address,
            tokenOut.address,
            fee,
            amountIn,
            0
        ).call()
        return price
    } catch (error) {
        console.error(`
        get price on UNISWAPV3 error 
        -------------------------
        ${error}
        -------------------------`)
        return ZEROO
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

