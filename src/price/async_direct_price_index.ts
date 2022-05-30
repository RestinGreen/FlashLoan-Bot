import { Dex, dex_dict, DexData, DexType } from "../address/dex_data"
import abiv2 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
import abiv3 from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"
import { convertToBigNumber, convertToBN, ZEROO } from "../utils/general"
import { Coin, Erc20Token, IToken } from "../address/coin"
import { RouteNode } from "../types/maxRoute"
import { flashAmount, flashLoan, flashLoanAddress, httpProvider, myAccount, walletPrivateKey } from "../config"
import { FlashParams } from "../types/flash"
import { dodo_flashloan_pools } from "../address/flashloan_pool"
import { BigNumber, ethers } from "ethers"
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils'
import BN from "bn.js"
import { getPriceOnUniV2 } from "./uniswapV2/uniswapV2TypeWeb3"
import { getPriceOnUniV3 } from "./uniswapV3/uniswapV3TypeWeb3"
import { Transaction } from "@ethereumjs/tx"


const createContracts = () => {
    var contracts: Map<string, Contract> = new Map<string, Contract>()
    Object.entries(dex_dict).forEach(([key, value]) => {
        contracts.set(
            key,
            new httpProvider.eth.Contract(
                value.type == 0 ? abiv2.abi as AbiItem[] : abiv3.abi as AbiItem[],
                value.address,
            ))

    }

    )
    return contracts
}

const contracts: Map<string, Contract> = createContracts()



const getPrice = (tokenAmount: BN, tokenIn: IToken, tokenOut: IToken, dex: string)
    : Promise<BN> => {

    switch (dex_dict[dex].type) {
        case DexType.UNISWAP_V2:

            return getPriceOnUniV2(
                tokenIn.address,
                tokenOut.address,
                tokenAmount,
                contracts.get(dex)!)

        case DexType.UNISWAP_V3:
        default:
            return getPriceOnUniV3(
                tokenIn,
                tokenOut,
                tokenAmount,
                contracts.get(dex)!)
    }

}



export const findOpAndDoArbitrage = async (tokenAmount: BN, tokenIn: IToken, tokenOut: IToken, blockNumber: number) => {



    Object.keys(dex_dict).forEach(async buyDex => {

        var start = Date.now()
        var amountOut: BN = await getPrice(tokenAmount, tokenIn, tokenOut, buyDex)
        var end = Date.now()
        // console.log(`${tokenIn.symbol} / ${tokenOut.symbol} \t ${buyDex} \t time: ${end-start} \t ${ethers.utils.formatUnits(convertToBigNumber(amountOut), tokenOut.decimals)}`)

        Object.keys(dex_dict).forEach(async sellDex => {
            if (buyDex != sellDex) {

                var start1 = Date.now()
                var sellBackAmount: BN = await getPrice(amountOut, tokenOut, tokenIn, sellDex)
                var end1 = Date.now()


                var x = new BN(sellBackAmount.toString())

                let profit: BN = x.sub(tokenAmount)
                if (profit.gt(ZEROO)) {
                    console.log(`block: ${blockNumber} ${tokenIn.symbol} / ${tokenOut.symbol} \t buy: ${buyDex} | sell:${sellDex} \t time: ${end - start} \t ${ethers.utils.formatUnits(convertToBigNumber(sellBackAmount), tokenIn.decimals)}`)
                    var flashpool: string = dodo_flashloan_pools[tokenIn.symbol]
                    executeArbitrage(
                        tokenIn,
                        tokenOut,
                        dex_dict[buyDex].type,
                        dex_dict[sellDex].type,
                        dex_dict[buyDex].address,
                        dex_dict[sellDex].address,
                        flashAmount,
                        flashpool)
                }
            }
        })
    })


}

async function executeArbitrage(
    tokenIn: IToken,
    tokenOut: IToken,
    buyDexType: DexType,
    sellDexType: DexType,
    buyDexAddress: string,
    sellDexAddress: string,
    flashloanAmount: number,
    flashloanPool: string

) {

    var params: FlashParams = {
        tokenIn: tokenIn.address,
        tokenOut: tokenOut.address,
        buyDexType: buyDexType,
        sellDexType: sellDexType,
        buyDexAddress: buyDexAddress,
        sellDexAddress: sellDexAddress,
        buyAmount: flashloanAmount,
        flashLoanPool: flashloanPool
    }

    const gasPrice = new BN(await httpProvider.eth.getGasPrice());
    const extraGas = ethers.utils.formatUnits("40", "gwei");

    let start = Date.now()

    console.log(`private key ${walletPrivateKey}`)

    const account = myAccount.address
    const privateKey = walletPrivateKey

    const dodoFlashloanFuntion = flashLoan.methods.dodoFlashLoan(params)

    const functionAbi = dodoFlashloanFuntion.encodeABI();

    let estimatedGas;
    let nonce;

    console.log("Getting gas estimate");
    
    httpProvider.eth.getGasPrice().then((gasPrice: string) => {

        console.log("current gas price: " + ethers.utils.formatUnits(gasPrice, 'gwei'));
        const extraGas: BN = convertToBN(ethers.utils.parseUnits('50', 'gwei'))
        const gas: BN = new BN(gasPrice)

        httpProvider.eth.getTransactionCount(account, 'latest').then(async _nonce => {
            nonce = _nonce.toString(16);
            
            console.log("Nonce: " + _nonce);
            const txParams = {
                gas: gas.add(extraGas).toString(),
                gasLimit: 15000000,
                to: flashLoanAddress,
                data: functionAbi,
                from: account,
                nonce: _nonce
            };

            const tx = await httpProvider.eth.accounts.signTransaction(txParams, walletPrivateKey)
            httpProvider.eth.sendSignedTransaction(tx.rawTransaction!, (error, hash) => {
                if (!error) {
                    console.log(`hash: ${hash}`)
                } else {
                    console.log(error)
                }
            })
        })
    });

    console.log('flashloan time', Date.now() - start)
}