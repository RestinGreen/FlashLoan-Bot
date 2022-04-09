import { BigNumber, Contract } from "ethers"
import { protocols, ProtocolType, ProtocolTypeEnum } from "../address/router"
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"
import QuoterV3 from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"
import { formatReadable, providerWSS } from "../utils/general"
import { getPriceOnUniV2 } from "./uniswapV2type"
import { getPriceOnUniV3 } from "./uniswapv3type"
import { Erc20Token, IToken } from "../address/coin"


type Delegate = {
    contract: Contract,
    type: ProtocolTypeEnum,
}
const delegates: Delegate[] = Array.from(Object.values(protocols), (protocol: ProtocolType) => (
    
    {
        contract:   new Contract(
            protocol.address,
            protocol.type==0 ? IUniswapV2Router02.abi : QuoterV3.abi,
            providerWSS
        ),
        type: protocol.type,
    }
))

export const getPriceAllDex = async (tokenAmount: BigNumber, tokenIn: IToken, tokenOut: IToken) => {

    
    for (var delegate of delegates) {
        switch (delegate.type) {
            //uniswap v2 original or forks
            case 0:
                var p = await getPriceOnUniV2(tokenIn.address, tokenOut.address, tokenAmount, delegate.contract)
                console.log(`${tokenIn.symbol}/${tokenOut.symbol} = ${formatReadable(p, tokenOut.decimals)}`)
                break
            //uniswap v3 original
            case 1:
                var p = await getPriceOnUniV3(tokenIn.address, tokenOut.address, tokenAmount, delegate.contract)
                console.log(`${tokenIn.symbol}/${tokenOut.symbol} = ${formatReadable(p, tokenOut.decimals)}`)
                break

        }

    }


}