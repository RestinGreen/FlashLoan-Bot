import { ethers } from "ethers"
import { BigNumber } from "bignumber.js";
import { formatUnits } from "ethers/lib/utils"
import { Contract } from 'web3-eth-contract';
import { dex_dict } from "../address/dex_data"
import { ipcProvider } from "../config"
import factoryV2 from "@uniswap/v2-periphery/build/IUniswapV2Factory.json"
import abiV2 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
import abiV3 from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"
import { AbiItem } from 'web3-utils'
const player = require('play-sound')();

export const getBigNumber = (amount: number | BigNumber, decimals: number = 18) => {
    return ethers.utils.parseUnits(amount.toString(), decimals);
}

export const ZERO = new BigNumber(0)
// export const ZERO = BigNumber.from(0)
export const bn997 = new BigNumber(997)
export const bn997_sqr = bn997.multipliedBy(bn997)
export const bn1000 = new BigNumber(1000)
export const bn1000_sqr = bn1000.multipliedBy(bn1000)
export const bn997000 = bn1000.multipliedBy(bn997)

export const TEN = new BigNumber(10)

export const getBN = (amount: number | string, decimals: number = 18) => {
    let decBN = new BigNumber(decimals)
    return new BigNumber(amount).multipliedBy(TEN.pow(decBN))
}

export const convertToBigNumber = (bn: BigNumber): ethers.BigNumber => {
    return ethers.BigNumber.from(bn.toString(10))
}

export const convertToBN = (bigNumber: BigNumber): BigNumber => {
    return new BigNumber(bigNumber.toString())
}

export const formatGwei = (bn: BigNumber): string => {
    return ethers.utils.formatUnits(convertToBigNumber(bn), 'gwei')
}

export const formatUnitsBN = (bn: BigNumber, decimals: number): string => {
    return ethers.utils.formatUnits(convertToBigNumber(bn), decimals)
}
export const log = (text: any, ...optionalParams: any[]) => {
    console.log(new Date(), text)
}

export const buildLog = (text: string): string => {
    let time = new Date()
    
    return `\x1b[38;2;255;0;255m${time.toISOString()}\x1b[0m` + ' ' + text + '\n'
}

export type Contracts = {
    router: Contract,
    factory: Contract
}

export const notify = () => {

    player.play('./src/notification/2.mp3', (err: any) => {
        if (err) console.log(`Could not play sound: ${err}`);
    });
}

const createContracts = () => {
    var contracts: Map<string, Contracts> = new Map<string, Contracts>()

    Object.entries(dex_dict).forEach(([key, value]) => {

        let router: Contract = new ipcProvider.eth.Contract(
            value.type == 0 ? abiV2.abi as AbiItem[] : abiV3.abi as AbiItem[],
            value.router)

        let factory: Contract = new ipcProvider.eth.Contract(factoryV2.abi as AbiItem[], value.factory)

        contracts.set(key,
            {
                router: router,
                factory: factory
            })

    })

    return contracts
}

export const contracts: Map<string, Contracts> = createContracts()