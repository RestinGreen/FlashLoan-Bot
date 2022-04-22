import { utils, BigNumber, providers } from "ethers"

require('dotenv').config();


export const providerHTTP = new providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY!)
export const providerWSS = new providers.AlchemyWebSocketProvider('matic', process.env.ALCHEMY_API_KEY!)
export const jsonRPCProvider = new providers.JsonRpcProvider(process.env.ALCHEMY_HTTP,'matic')


export const getBigNumber = (amount: number | BigNumber, decimals = 18) => {
    return utils.parseUnits(amount.toString(), decimals);
};

export const formatReadable = (bn: BigNumber, decimals: number) => {
    
    var string = bn.toString()
    var length = string.length
    return string.slice(0, length-decimals) + '.' + string.slice(length-decimals)

    
}