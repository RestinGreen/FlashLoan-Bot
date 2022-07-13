//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IUniswapV2Pair.sol";


contract DoSimpleArb is Ownable {

    function getAmountOut(uint256 reserveIn, uint256 reserveOut, uint256 amountIn) internal pure returns(uint256 amountOut) {
        uint amountInWithFee = amountIn*997;
        uint numerator = amountInWithFee*reserveOut;
        uint denominator = (reserveIn*1000)+amountInWithFee;
        amountOut = numerator / denominator;
    }

     function getAmountIn(uint256 reserveIn, uint256 reserveOut, uint256 amountOut) internal pure returns(uint256 amountIn) {
        uint numerator = reserveIn*amountOut*1000;
        uint denominator = (reserveOut-amountOut)*997;
        amountIn = (numerator / denominator)+1;
    }

    function printMoney(
        uint256 flashAmount,
        address flashToken,
        address paybackToken,
        address[] memory path
    ) external onlyOwner {
        
        (uint112 _reserve00, uint112 _reserve01,) = IUniswapV2Pair(path[0]).getReserves();
        uint256 paybackAmount = getAmountIn(
            paybackToken == IUniswapV2Pair(path[0]).token0() ? _reserve00 : _reserve01, 
            paybackToken == IUniswapV2Pair(path[0]).token0() ? _reserve01 : _reserve00,
            flashAmount);
        if ((flashToken == IUniswapV2Pair(path[0]).token0() ? _reserve00 : _reserve01) < flashAmount) {
            return;
        }

        (uint112 _reserve10, uint112 _reserve11,) = IUniswapV2Pair(path[1]).getReserves();
        uint256 amountOut = getAmountOut(
            flashToken == IUniswapV2Pair(path[1]).token0() ? _reserve10 : _reserve11,
            flashToken == IUniswapV2Pair(path[1]).token0() ? _reserve11 : _reserve10,
             flashAmount);
        if (amountOut>paybackAmount) {
            uint256 amountOut0 = flashToken == IUniswapV2Pair(path[0]).token0() ? flashAmount : 0;
            uint256 amountOut1 = flashToken == IUniswapV2Pair(path[0]).token1() ? flashAmount : 0;
            bytes memory data = abi.encode(flashAmount, paybackAmount, flashToken, paybackToken, path, amountOut);
            IUniswapV2Pair(path[0]).swap(amountOut0, amountOut1, address(this), data);
        }
    }

    fallback() external {
        (address _sender,,, bytes memory fallbackData) = abi.decode(msg.data[4:],(address, uint256, uint256, bytes));

        (uint256 flashAmount, uint256 paybackAmount, address flashToken, address paybackToken, address[] memory path, uint256 pair1Out) = abi.decode(fallbackData, (uint256, uint256, address, address, address[], uint256));
        require(msg.sender == path[0], "1");
        require(_sender == address(this), "2");
        IERC20(flashToken).transfer(path[1], flashAmount);

        IUniswapV2Pair(path[1]).swap(
            paybackToken == IUniswapV2Pair(path[1]).token0() ? pair1Out : 0, 
            paybackToken == IUniswapV2Pair(path[1]).token1() ? pair1Out : 0,
            address(this), "");
        IERC20(paybackToken).transfer(path[0], paybackAmount);
        IERC20(paybackToken).transfer(owner(), IERC20(paybackToken).balanceOf(address(this))-1); 
    }
}
