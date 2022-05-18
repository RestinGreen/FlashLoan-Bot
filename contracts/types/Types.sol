// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum DexType {
    UNISWAP_V2,
    UNISWAP_V3,
    DODO
}

struct FlashParams {
    address buyAddress;
    address sellAddress;
    DexType buyDex;
    DexType sellDex;
    uint256 buyAmount;
    address flashLoanPool;
}

struct FlashCallbackData {
    address me;
    address buyAddress;
    address sellAddress;
    DexType buyDex;
    DexType sellDex;
    uint256 buyAmount;
    address flashLoanPool;
}