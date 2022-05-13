import { utils, BigNumber, providers, ethers } from "ethers"

require('dotenv').config();


export const alchemyProviderHTTP = new providers.AlchemyProvider(`matic`, process.env.ALCHEMY_API_KEY)
// export const alchemyProviderWSS = new providers.AlchemyWebSocketProvider('matic', process.env.ALCHEMY_API_KEY)
// export const jsonRPCProvider = new providers.JsonRpcProvider(process.env.ALCHEMY_HTTP,'matic')
export const localFork = new providers.JsonRpcProvider(process.env.LOCAL_FORK)
// export const localETHLight = new providers.JsonRpcProvider(process.env.LOCAL_FORK)


export const getBigNumber = (amount: number | BigNumber, decimals: number = 18) => {
    return ethers.utils.parseUnits(amount.toString(), decimals);
};

export const ZERO = BigNumber.from(0)
