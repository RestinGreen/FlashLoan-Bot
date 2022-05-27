import { ethers } from "ethers"
import { Coin } from "./address/coin"
import { getBigNumber, localNode } from "./utils/general"
import { abi as FlashABI } from "../artifacts/contracts/Flashloan.sol/Flashloan.json"
import { abi as DodoABI } from "../artifacts/contracts/dodo/DodoFlashloan.sol/DODOFlashloan.json"

require('dotenv').config();

export const flashAmount = 3000
export const tokenIn = Coin.USDC
export const tokenOut = Coin.WETH
export const flashAmountBN = getBigNumber(flashAmount, tokenIn.decimals)

export const tokenIns = [Coin.USDC]
export const tokenOuts =  [Coin.WMATIC]

//alchemyProviderHTTP
//localNode                 ebbe a blockba van profit az en botommal 27988982 28220198
//npx hardhat node --fork https://polygon-mainnet.g.alchemy.com/v2/kLQlGBCvwKLhyFtlglA117qDFHjxURUD --fork-block-number 28220198 --port 9999
export const provider = localNode

const flashLoanAddress = "0xd78eFAb315cAf4B4B55dc0A760db864813669c3f"
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY

export const flashLoan = new ethers.Contract(flashLoanAddress, FlashABI, provider)
export const signer = new ethers.Wallet(walletPrivateKey!, provider)

const dodoAddress = "0x21432F2F86d056D1F4Ee99eC81758042C9588D03"
export const dodoexample = new ethers.Contract(dodoAddress, DodoABI, provider)