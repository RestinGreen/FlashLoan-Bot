import { ethers } from "ethers"
import { Coin } from "./address/coin"
import { alchemyProviderHTTP, getBigNumber, localFork } from "./utils/general"
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
//localFork                 ebbe a blockba van profit az en botommal 27988982 28220198
//npx hardhat node --fork https://polygon-mainnet.g.alchemy.com/v2/kLQlGBCvwKLhyFtlglA117qDFHjxURUD --fork-block-number 27988982
export const provider = localFork

const flashLoanAddress = "0xe6cFc17053c64838Fd7bb55BD4A2cb5b207A71ed"
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY

export const flashLoan = new ethers.Contract(flashLoanAddress, FlashABI, provider)
export const signer = new ethers.Wallet(walletPrivateKey!, provider)

const dodoAddress = "0x4D62B7e8aeAA2d6edAAdd7D533843520aB4304c2"
export const dodoexample = new ethers.Contract(dodoAddress, DodoABI, provider)