//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {FlashParams, FlashCallbackData} from "./types/Types.sol";
import {IDODO} from "./interfaces/IDODO.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract Flashloan {
    constructor() {}

    function dodoFlashLoan(FlashParams memory params) external {
        
        bytes memory data = abi.encode(
            FlashCallbackData({
                me: msg.sender,
                buyAddress: params.buyAddress,
                sellAddress: params.sellAddress,
                buyDex: params.buyDex,
                sellDex: params.sellDex,
                buyAmount: params.buyAmount,
                flashLoanPool: params.flashLoanPool
            })
        );
        address flashLoanPool = params.flashLoanPool;
        console.log("before call", IDODO(params.flashLoanPool)._QUOTE_TOKEN_());

        address flashLoanBase = IDODO(flashLoanPool)._BASE_TOKEN_();
        if (flashLoanBase == params.buyAddress) {
            console.log('elso if');
            IDODO(flashLoanPool).flashLoan(params.buyAmount, 0, address(this),data);
        } else {
            console.log('masodik if');
            IDODO(flashLoanPool).flashLoan(0, params.buyAmount, address(this), data);
        }
        console.log("after call");
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
        console.log(IERC20(params.buyAddress).balanceOf((address(this))));



        //Return funds
        IERC20(params.buyAddress).transfer(params.flashLoanPool, params.buyAmount);
    }
}
