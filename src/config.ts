import { ethers } from "ethers"
import { Coin } from "./address/coin"
import { fork, getBigNumber, localNode } from "./utils/general"
import { abi as FlashABI } from "../artifacts/contracts/Flashloan.sol/Flashloan.json"
import { abi as DodoABI } from "../artifacts/contracts/dodo/DodoFlashloan.sol/DODOFlashloan.json"

require('dotenv').config();

export const flashAmount = 3000
export const tokenIn = Coin.USDC
export const tokenOut = Coin.WETH
export const flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)

export const tokenIns = [Coin.USDC]
export const tokenOuts =  [Coin.WMATIC, Coin.WETH, Coin.WBTC]

//alchemyProviderHTTP
//localNode                 ebbe a blockba van profit az en botommal 27988982 28220198

// ezt meghivta az en kodom de errort dobott: Fail with error 'ERC20: transfer amount exceeds balance'28845042

//npx hardhat node --fork https://polygon-mainnet.g.alchemy.com/v2/kLQlGBCvwKLhyFtlglA117qDFHjxURUD --fork-block-number 28220198 --port 9999
export const provider = localNode

// contract on mainnet 0xBe9b39B0F3B34a9f755Bc5779d97F0d232EccBE7
const testFlashloanAddress = '0x2B3323Dba63a4a1Ed0a4B02d0B3fD5C901760881'
const flashLoanAddress = "0xBe9b39B0F3B34a9f755Bc5779d97F0d232EccBE7"
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY

export const testFlashloan = new ethers.Contract(testFlashloanAddress, FlashABI, provider)
export const flashLoan = new ethers.Contract(flashLoanAddress, FlashABI, provider)
export const signer = new ethers.Wallet(walletPrivateKey!, provider)

// const dodoAddress = "0x21432F2F86d056D1F4Ee99eC81758042C9588D03"
// export const dodoexample = new ethers.Contract(dodoAddress, DodoABI, provider)