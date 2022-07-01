import { BigNumber } from "bignumber.js";
import { Contract } from 'web3-eth-contract';
import { IToken } from "../../address/coin";
import { getBigNumber, ZERO } from "../../utils/general";

type FeeMap = {
    [pair: string]: {
        [pair: string]: number;
    };
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
        let price = await contract.methods.quoteExactInputSingle(
            tokenIn.address,
            tokenOut.address,
            fee,
            amountIn,
            0
        ).call()
        return price
    } catch (error) {
        return ZERO
    }
};

export const getPriceOnUniV3Promise = async (
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
        let price = contract.methods.quoteExactInputSingle(
            tokenIn.address,
            tokenOut.address,
            fee,
            amountIn,
            0
        ).call()
        return price
    } catch (error) {
        return ZERO
    }
};

export const uniswapV3Fee: FeeMap = {
    USDC: {
        SWYF: 100,
        WETH: 500,
        miMATIC: 500,
        USDT: 100,
        XMT: 10000,
        DAI: 100,
        WBTC: 3000,
        MATIC: 500,
        MVX: 10000,
        agEUR: 100,
        indexUSDC: 300,
        PAR: 500,
        KOLO: 300,
        $MECHA: 10000,
        KASTA: 300,
        NZDS: 500,        
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

