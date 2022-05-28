import { utils, BigNumber, providers, ethers } from "ethers"
import { provider} from "../config";

require('dotenv').config();


// export const infuraProviderHTTP = new providers.InfuraProvider('matic', process.env.INFURA_API_KEY)
// export const alchemyProviderHTTP = new providers.AlchemyProvider(`matic`, process.env.ALCHEMY_API_KEY)
// export const moralisProvider = new providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/8f9ec171d32fe09793a29b32/polygon/mainnet', 'matic')
// export const alchemyProviderWSS = new providers.AlchemyWebSocketProvider('matic', process.env.ALCHEMY_API_KEY)
// export const jsonRPCProvider = new providers.JsonRpcProvider(process.env.ALCHEMY_HTTP,'matic')
export const localNode = new providers.JsonRpcProvider('http://127.0.0.1:8545')
export const localNodeWs = new providers.WebSocketProvider('ws://127.0.0.1:8546')
export const fork = new providers.JsonRpcProvider('http://127.0.0.1:9999')

export const getBigNumber = (amount: number | BigNumber, decimals: number = 18) => {
    return ethers.utils.parseUnits(amount.toString(), decimals);
}

export const ZERO = BigNumber.from(0)
// //contract
