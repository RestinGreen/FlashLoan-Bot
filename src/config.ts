import { Coin } from "./address/coin"
// import { getBN } from "./utils/general"
import { abi as FlashABI } from "../artifacts/contracts/Flashloan.sol/Flashloan.json"
import Web3 from "web3"
import { AbiItem } from "web3-utils"
var net = require('net');

require('dotenv').config();

export const flashAmount = "2"
// export const flashAmountBN = getBN(flashAmount, tokenIn.decimals)

export const tokenIns = [Coin.USDC]
export const tokenOuts =  [Coin.WMATIC, Coin.WETH, Coin.WBTC]

//alchemyProviderHTTP
//localNode                 ebbe a blockba van profit az en botommal 27988982 
/*
block with profit for testing
    28220198
        - USDC / WMATIC   buy: SUSHISWAP | sell:UNISWAP_V3    3011.501436
        - USDC / WMATIC   buy: QUICKSWAP | sell:UNISWAP_V3    3014.378547
    28981601
        - USDC / WETH     buy: QUICKSWAP | sell:SUSHISWAP     3014.353272
        - USDC / WETH     buy: UNISWAP_V3 | sell:SUSHISWAP    3029.70639
*/

// ezt meghivta az en kodom de errort dobott: Fail with error 'ERC20: transfer amount exceeds balance'28845042

//npx hardhat node --fork https://polygon-mainnet.g.alchemy.com/v2/kLQlGBCvwKLhyFtlglA117qDFHjxURUD --fork-block-number 28220198 --port 9999
// export const wsProvider = new Web3('ws://127.0.0.1:8546')
// export const ipcProvider = new Web3(new Web3.providers.IpcProvider("/home/matic/.bor/data/bor.ipc", net))
export const wsProvider = new Web3('ws://127.0.0.1:8888')
export const ipcProvider = new Web3('http://127.0.0.1:8888')


/* contracts on mainnet in order of deployment. latest is at the bottom 
0xBe9b39B0F3B34a9f755Bc5779d97F0d232EccBE7
0x06dd5932bf703816Ba943F74b0cF9D53adD0677C
*/

export const flashLoanAddress: string = "0x06dd5932bf703816Ba943F74b0cF9D53adD0677C"
export const walletPrivateKey: string = process.env.WALLET_PRIVATE_KEY!

export const myAccount = ipcProvider.eth.accounts.privateKeyToAccount(walletPrivateKey)
export const flashLoan = new ipcProvider.eth.Contract(FlashABI as AbiItem[], flashLoanAddress, 
    {
        from: myAccount.address,
        gas: 15000000
    })
