import { Coin } from "./address/coin"
import { getBN } from "./utils/general"
import { abi as FlashABI } from "../artifacts/contracts/Flashloan.sol/Flashloan.json"
import Web3 from "web3"
import { AbiItem } from "web3-utils"

require('dotenv').config();

export const flashAmount = 3000
export const tokenIn = Coin.USDC
export const tokenOut = Coin.WETH
export const flashAmountBN = getBN(flashAmount, tokenIn.decimals)

export const tokenIns = [Coin.USDC]
export const tokenOuts =  [Coin.WMATIC, Coin.WETH, Coin.WBTC]

//alchemyProviderHTTP
//localNode                 ebbe a blockba van profit az en botommal 27988982 
/*
block with profit for testing
    28220198
        - USDC / WMATIC   buy: SUSHISWAP | sell:UNISWAP_V3    3011.501436
        - USDC / WMATIC   buy: QUICKSWAP | sell:UNISWAP_V3    3014.378547
*/

// ezt meghivta az en kodom de errort dobott: Fail with error 'ERC20: transfer amount exceeds balance'28845042

//npx hardhat node --fork https://polygon-mainnet.g.alchemy.com/v2/kLQlGBCvwKLhyFtlglA117qDFHjxURUD --fork-block-number 28220198 --port 9999
export const httpProvider = new Web3('http://127.0.0.1:8545')
export const wsProvider = new Web3('ws://127.0.0.1:8546')



// contract on mainnet 0xBe9b39B0F3B34a9f755Bc5779d97F0d232EccBE7

export const flashLoanAddress: string = "0xBe9b39B0F3B34a9f755Bc5779d97F0d232EccBE7"
export const walletPrivateKey: string = process.env.WALLET_PRIVATE_KEY!

export const myAccount = httpProvider.eth.accounts.privateKeyToAccount(walletPrivateKey)
export const flashLoan = new httpProvider.eth.Contract(FlashABI as AbiItem[], flashLoanAddress, 
    {
        from: myAccount.address,
        gas: 15000000
    })
