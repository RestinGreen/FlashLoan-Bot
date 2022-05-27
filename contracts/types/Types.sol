// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum DexType {
    UNISWAP_V2,
    UNISWAP_V3,
    DODO
}

struct FlashParams {
    address tokenIn;
    address tokenOut;
    DexType buyDexType;
    DexType sellDexType;

    address buyDexAddress;
    address sellDexAddress;

    uint256 buyAmount;
    address flashLoanPool;
}

struct FlashCallbackData {
    address me;
    address tokenIn;
    address tokenOut;
    DexType buyDexType;
    DexType sellDexType;

    address buyDexAddress;
    address sellDexAddress;

    uint256 buyAmount;
    address flashLoanPool;
}