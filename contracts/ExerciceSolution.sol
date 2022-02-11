pragma solidity ^0.6.0;

import "./utils/IUniswapV2Factory.sol";
import "./utils/IUniswapV2Pair.sol";
import "./RichERC20.sol";
import "./utils/IUniswapV2Router.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ExerciceSolution {
    IUniswapV2Factory uniswapFactory;
    RichERC20 erc20;
    IUniswapV2Pair pair;

    constructor (IUniswapV2Factory _uniswapFactory, RichERC20 _erc20) public {
        uniswapFactory = _uniswapFactory;
        erc20 = _erc20;
    }

    // function addLiquidity() external;

	// function withdrawLiquidity() external;

	// function swapYourTokenForDummyToken() external;

	// function swapYourTokenForEth() external;
}