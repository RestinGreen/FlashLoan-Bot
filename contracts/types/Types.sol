// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum DexType {
    UNISWAPV2,
    UNISWAPV3,
    DODO
}

struct FlashParams {
    address buyAddress;
    address sellAddress;
    DexType buyDex;
    DexType sellDex;
    uint256 amount;
}

struct FlashCallbackData {
    address me;
    address buyAddress;
    address sellAddress;
    DexType buyDex;
    DexType sellDex;
    uint256 amount;
}