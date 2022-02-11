const Str = require('@supercharge/strings')
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
var evaluator = artifacts.require("Evaluator.sol");
var exerciceSolution= artifacts.require("ExerciceSolution.sol");
var richERC20= artifacts.require("RichERC20.sol")
const account="0x1C89c8e3e76690552372d3BE3c514275B1e5137E"


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        await setPermissionsAndRandomValues(deployer, network, accounts); 
        await deployRecap(deployer, network, accounts); 
		await doExercices(deployer, network, accounts);
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-AMM-101","TD-AMM-101",web3.utils.toBN("20000000000000000000000000000"))
	dummyToken = await ERC20.new("dummyToken", "DTK", web3.utils.toBN("2000000000000000000000000000000"))
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
	wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab"
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address, dummyToken.address, uniswapV2FactoryAddress, wethAddress)
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

// async function deploySolution(deployer, network, accounts) {
// 	RichERC20 = await richERC20.new()
// 	Solution = await exerciceSolution.new( RichERC20.address, weth, uniswapV2FactoryAddress)
// }

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("dummyToken " + dummyToken.address)
	console.log("Evaluator " + Evaluator.address)
}


async function doExercices(deployer, network, accounts){

	// score
	console.log("'''''''''''' Score ''''''''''''")
	const startBalance = await TDToken.balanceOf(accounts[0])
	console.log("startBalance " + startBalance)

	// // deploy solution
	// await deploySolution(deployer, network, accounts)

	// submit exercice
	console.log("'''''''''''' Submit Exercice ''''''''''''")
	await Evaluator.submitExercice(Solution.address , {from:account})
	const submit_balance = await TDToken.balanceOf(account)
	console.log("submit_balance " + submit_balance)

}