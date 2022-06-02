import { BigNumber, ethers } from "ethers"
import BN from "bn.js"
import { formatUnits } from "ethers/lib/utils";


export const getBigNumber = (amount: number | BigNumber, decimals: number = 18) => {
    return ethers.utils.parseUnits(amount.toString(), decimals);
}

export const ZEROO = new BN(0)
export const ZERO = BigNumber.from(0)


export const TEN = new BN(10)
export const getBN =  (amount: number | BN, decimals: number = 18) => {
    let decBN = new BN(decimals)
    return new BN(amount).mul(TEN.pow(decBN))
}

export const convertToBigNumber = (bn: BN): BigNumber => {
    return BigNumber.from(bn.toString())
}

export const convertToBN = (bigNumber: BigNumber): BN => {
    return new BN(bigNumber.toString())
}

export const formatGwei = (bn: BN): string =>{
    return ethers.utils.formatUnits(convertToBigNumber(bn), 'gwei')
}