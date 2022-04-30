import { utils, BigNumber, providers } from "ethers"

require('dotenv').config();


export const alchemyProviderHTTP = new providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY!)
export const alchemyProviderWSS = new providers.AlchemyWebSocketProvider('matic', process.env.ALCHEMY_API_KEY!)
export const jsonRPCProvider = new providers.JsonRpcProvider(process.env.ALCHEMY_HTTP,'matic')
export const ganacheFork = new providers.JsonRpcProvider(process.env.GANACHE_FORK)
export const localETHLight = new providers.JsonRpcProvider('http://127.0.0.1:8545')

export const getBigNumber = (amount: number | BigNumber, decimals = 18) => {
    return utils.parseUnits(amount.toString(), decimals);
};

export const formatReadable = (bn: BigNumber, decimals: number) => {
    
    var string = bn.toString()
    var length = string.length
    return string.slice(0, length-decimals) + '.' + string.slice(length-decimals)

    
}