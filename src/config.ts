import { ethers } from "ethers"
import { Coin } from "./address/coin"
import { alchemyProviderHTTP, getBigNumber, localNode } from "./utils/general"
import { abi as FlashABI } from "../artifacts/contracts/Flashloan.sol/Flashloan.json"
import { abi as DodoABI } from "../artifacts/contracts/dodo/DodoFlashloan.sol/DODOFlashloan.json"

require('dotenv').config();

var flashAmount = 3000
export const tokenIn = Coin.USDC
export const tokenOut = Coin.WETH
export const flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)

export const tokenIns = [Coin.USDC]
export const tokenOuts =  [Coin.WETH]

//alchemyProviderHTTP
//localNode                 ebbe a blockba van profit az en botommal 27988982 28220198
//npx hardhat node --fork https://polygon-mainnet.g.alchemy.com/v2/kLQlGBCvwKLhyFtlglA117qDFHjxURUD --fork-block-number 28220198
export const provider = localNode

const flashLoanAddress = "0xC5123B98c3A0aa1a4F9390BCf76f7B9D775a5687"
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY

export const flashLoan = new ethers.Contract(flashLoanAddress, FlashABI, provider)
export const signer = new ethers.Wallet(walletPrivateKey!, provider)

const dodoAddress = "0x1bA8781Ca57ce21Be27a0aE424097daC91C19175"
export const dodoexample = new ethers.Contract(dodoAddress, DodoABI, provider)