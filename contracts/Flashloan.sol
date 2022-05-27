//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import { FlashParams, FlashCallbackData, DexType } from "./types/Types.sol";
import { IDODO } from "./interfaces/IDODO.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ISwapRouter } from "./interfaces/uniswap_v3/ISwapRouter.sol";
import { IUniswapV2Router } from "./interfaces/uniswap_v2/IUniswapV2Router.sol";

import "hardhat/console.sol";

contract Flashloan {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    event ArbitrageSuccessful(address tokenOut, uint256 amount);
    event RealizedProfit(address token, uint256 amount);

    constructor() {}

    function dodoFlashLoan(FlashParams memory params) external {
        
        bytes memory data = abi.encode(
            FlashCallbackData({
                me: msg.sender,
                tokenIn: params.tokenIn,
                tokenOut: params.tokenOut,
                buyDexType: params.buyDexType,
                sellDexType: params.sellDexType,
                buyDexAddress: params.buyDexAddress,
                sellDexAddress: params.sellDexAddress,
                buyAmount: params.buyAmount,
                flashLoanPool: params.flashLoanPool
            })
        );
        address flashLoanPool = params.flashLoanPool;
        // console.log("before call", IDODO(params.flashLoanPool)._QUOTE_TOKEN_());

        address flashLoanBase = IDODO(flashLoanPool)._BASE_TOKEN_();
        if (flashLoanBase == params.tokenIn) {
            // console.log('elso if');
            IDODO(flashLoanPool).flashLoan(params.buyAmount, 0, address(this),data);
        } else {
            // console.log('masodik if');
            IDODO(flashLoanPool).flashLoan(0, params.buyAmount, address(this), data);
        }
        // console.log("after call");
    }

    //Note: CallBack function executed by DODOV2(DVM) flashLoan pool
    function DVMFlashLoanCall(
        address sender,
        uint256 baseAmount,
        uint256 quoteAmount,
        bytes calldata data
    ) external {
        _flashLoanCallBack(sender, baseAmount, quoteAmount, data);
    }

    //Note: CallBack function executed by DODOV2(DPP) flashLoan pool
    function DPPFlashLoanCall(
        address sender,
        uint256 baseAmount,
        uint256 quoteAmount,
        bytes calldata data
    ) external {
        _flashLoanCallBack(sender, baseAmount, quoteAmount, data);
    }

    //Note: CallBack function executed by DODOV2(DSP) flashLoan pool
    function DSPFlashLoanCall(
        address sender,
        uint256 baseAmount,
        uint256 quoteAmount,
        bytes calldata data
    ) external {
        _flashLoanCallBack(sender, baseAmount, quoteAmount, data);
    }

    function _flashLoanCallBack(address sender, uint256, uint256, bytes calldata data) internal {
        FlashCallbackData memory params = abi.decode(data, (FlashCallbackData));

        require(sender == address(this) && msg.sender == params.flashLoanPool, "HANDLE_FLASH_NENIED");

        //Note: Realize your own logic using the token from flashLoan pool.
        require(IERC20(params.tokenIn).balanceOf((address(this)))>= params.buyAmount, "Borrow unsuccessful");
        // console.log(IERC20(params.tokenIn).balanceOf((address(this))));
        swap(params.buyDexType, params.buyAmount, params.tokenIn, params.tokenOut, params.buyDexAddress);
        //get swapped token amount in contract
        uint256 boughtTokenAmount = IERC20(params.tokenOut).balanceOf(address(this));
        // console.log('token out amount: ', boughtTokenAmount);
        // sell back
        swap(params.sellDexType, boughtTokenAmount, params.tokenOut, params.tokenIn, params.sellDexAddress);

        emit ArbitrageSuccessful(params.tokenOut, boughtTokenAmount);

        //Return funds
        IERC20(params.tokenIn).transfer(params.flashLoanPool, params.buyAmount);

        //send proffit to personal wallet
        uint256 profit = IERC20(params.tokenIn).balanceOf(address(this));
        // console.log('profit', profit);
        IERC20(params.tokenIn).transfer(params.me, profit);
        emit RealizedProfit(params.tokenIn, profit);
        //check owner balance
        // console.log('amount of coin in owner address: ', IERC20(params.tokenIn).balanceOf(address(params.me)));
    }

    function swap(DexType dexType, uint256 amount, address tokenIn, address tokenOut, address router) internal {

        if (dexType == DexType.UNISWAP_V2) {
            swapOnUniswapV2(amount, tokenIn, tokenOut, router);

        } else if (dexType == DexType.UNISWAP_V3) {
            swapOnUniswapV3(amount, tokenIn, tokenOut, router);
        }

    }

    function swapOnUniswapV2(uint256 amount, address tokenIn, address tokenOut, address router) internal
        returns(uint256 amountOut) {
            IUniswapV2Router swapRouter = IUniswapV2Router(router);
            approveToken(tokenIn, address(swapRouter), amount);
            address[] memory path = new address[](2);
            path[0] = tokenIn;
            path[1] = tokenOut;

            amountOut = swapRouter.swapExactTokensForTokens(
                amount, 1, path, address(this), block.timestamp)[1];

    }
    //TODO pass router from typescript side
    function swapOnUniswapV3(uint256 amount, address tokenIn, address tokenOut, address router) internal
        returns(uint256 amountOut) {
        ISwapRouter swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
        approveToken(tokenIn, address(swapRouter), amount);
        amountOut = swapRouter.exactInputSingle(
            ISwapRouter.ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: 500, //TODO send over the params the fee
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amount,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            })
        );

    }

    function approveToken(
        address token,
        address to,
        uint256 amountIn
    ) internal {
        require(IERC20(token).approve(to, amountIn), "approve failed.");
    }



}
