import { BigNumber } from "bignumber.js";
import { Contract } from 'web3-eth-contract';
import { log, ZERO } from "../../utils/general";
import { Method } from 'web3-core-method';

export const getPriceOnUniV2 = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumber,
    contract: Contract
): Promise<BigNumber> => {

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
        // log('error')
        return ZERO
    } finally {
        // console.log(Date.now() - start)
    }
}

export const getPriceOnUniV2Promise = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumber,
    contract: Contract
): Promise<BigNumber> => {

    // var start = Date.now()
    try {
        var price = contract.methods.getAmountsOut(
            amountIn,
            [
                tokenIn,
                tokenOut
            ]
        ).call()
        return price
    } catch (error) {
        // log('error')
        return ZERO
    } finally {
        // console.log(Date.now() - start)
    }
}

export const getPriceOnUniV2Request = (
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumber,
    contract: Contract
): Method => {

    var start = Date.now()
    try {
        var price = contract.methods.getAmountsOut(
            amountIn,
            [
                tokenIn,
                tokenOut
            ]
        ).call.request({from: 0x0}, (err: any, res: any)=>{
            log(res)
            // log(Date.now()-start)

        })
        return price
    } catch (error) {
        // log('error')
        // return ZEROO
        throw error
    } finally {
        // console.log(Date.now() - start)
    }
}

