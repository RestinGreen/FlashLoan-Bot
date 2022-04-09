import { utils, BigNumber, providers } from "ethers"

require('dotenv').config();


export const providerHTTP = new providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY!)
export const providerWSS = new providers.AlchemyWebSocketProvider('matic', process.env.ALCHEMY_API_KEY!)


export const getBigNumber = (amount: number, decimals = 18) => {
    return utils.parseUnits(amount.toString(), decimals);
};

export const formatReadable = (bn: BigNumber, decimals: number) => {

    var decimal: BigNumber = BigNumber.from(10).pow(decimals)
    let remainder = bn.mod(decimal)
    let whole = bn.div(decimal)

    return `${whole}.${remainder}`
}