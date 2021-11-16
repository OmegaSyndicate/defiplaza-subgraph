import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import {
	Approval,
	BootstrapBonus,
	BootstrapCompleted,
	Bootstrapped,
	LiquidityAdded,
	LiquidityRemoved,
	MultiLiquidityAdded,
	MultiLiquidityRemoved,
	OwnershipTransferred,
	Swapped,
	Transfer
} from "../generated/DefiPlaza/DefiPlaza"
import { Swap } from "../generated/schema";
import { DEX_TOKENS, DFP2_ADDRESS, ONE_BI, ZERO_BD } from "./constants";
import { DexToken } from "./tokens";
import { calculateDailyTradeVolume, calculateHourlyTradeVolume, convertAmountToDecimal, fetchDFP2TotalSupply, fetchTokenTotalSupply, fetchXDP2TotalSupply, getAverageUSD, getTVL, loadDaily, loadDailyToken, loadFactory, loadHourly, loadHourlyToken, loadPair, loadToken, loadTransaction } from "./util";

export function handleLiquidityAdded(event: LiquidityAdded): void {
	let factory = loadFactory();
	let transaction = loadTransaction(event); // just store this transaction, to display last synced block
	
	let token = loadToken(event.params.token);
	let dexToken = DexToken.getToken(event.params.token);
	let tokenAmount = convertAmountToDecimal(event.params.tokenAmount, dexToken.decimals);
	let dfp2 = loadToken(Address.fromString(DFP2_ADDRESS));

	// Calculate liquidity in USD
	let inputPercentage = tokenAmount.div(token.tokenAmount);
	let averageUSD = getAverageUSD();
	let inputUSD = averageUSD.times(inputPercentage);

	// Update token
	token.tokenAmount = token.tokenAmount.plus(tokenAmount);
	token.tokenPriceUSD = getAverageUSD().div(token.tokenAmount);
	token.save();

	// Update Factory
	factory.totalValueLockedUSD = getTVL();
	factory.dfp2TotalSupply = fetchDFP2TotalSupply();
	factory.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	factory.xdp2TotalSupply = fetchXDP2TotalSupply();
	factory.save();

	// // Update Hourly
	let hourly = loadHourly(event);
	hourly.liquidityCount = hourly.liquidityCount.plus(ONE_BI);
	hourly.liquidityUSD = hourly.liquidityUSD.plus(inputUSD);
	hourly.liquidityAddedUSD = hourly.liquidityAddedUSD.plus(inputUSD);
	hourly.totalValueLockedUSD = factory.totalValueLockedUSD;
	hourly.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	hourly.xdp2TotalSupply = factory.xdp2TotalSupply;
	calculateHourlyTradeVolume(hourly);
	hourly.save();

	// // Update Daily
	let daily = loadDaily(event);
	daily.liquidityCount = daily.liquidityCount.plus(ONE_BI);
	daily.liquidityUSD = daily.liquidityUSD.plus(inputUSD);
	daily.liquidityAddedUSD = daily.liquidityAddedUSD.plus(inputUSD);
	daily.totalValueLockedUSD = factory.totalValueLockedUSD;
	daily.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	daily.xdp2TotalSupply = factory.xdp2TotalSupply;
	calculateDailyTradeVolume(daily);
	daily.save();
}

export function handleLiquidityRemoved(event: LiquidityRemoved): void {
	let factory = loadFactory();
	let transaction = loadTransaction(event); // just store this transaction, to display last synced block

	let token = loadToken(event.params.token);
	let dexToken = DexToken.getToken(event.params.token);
	let tokenAmount = convertAmountToDecimal(event.params.tokenAmount, dexToken.decimals);
	let dfp2 = loadToken(Address.fromString(DFP2_ADDRESS));

	// Calculate liquidity in USD
	let inputPercentage = tokenAmount.div(token.tokenAmount);
	let averageUSD = getAverageUSD();
	let inputUSD = averageUSD.times(inputPercentage);

	// Update token
	token.tokenAmount = token.tokenAmount.minus(tokenAmount);
	token.tokenPriceUSD = getAverageUSD().div(token.tokenAmount);
	token.save();

	// Update Factory
	factory.totalValueLockedUSD = getTVL();
	factory.dfp2TotalSupply = fetchDFP2TotalSupply();
	factory.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	factory.xdp2TotalSupply = fetchXDP2TotalSupply();
	factory.save();

	// // Update Hourly
	let hourly = loadHourly(event);
	hourly.liquidityCount = hourly.liquidityCount.plus(ONE_BI);
	hourly.liquidityUSD = hourly.liquidityUSD.minus(inputUSD);
	hourly.liquidityRemovedUSD = hourly.liquidityRemovedUSD.minus(inputUSD);
	hourly.totalValueLockedUSD = getTVL();
	hourly.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	hourly.xdp2TotalSupply = factory.xdp2TotalSupply;
	calculateHourlyTradeVolume(hourly);
	hourly.save();

	// // Update Daily
	let daily = loadDaily(event);
	daily.liquidityCount = daily.liquidityCount.plus(ONE_BI);
	daily.liquidityUSD = daily.liquidityUSD.minus(inputUSD);
	daily.liquidityRemovedUSD = daily.liquidityRemovedUSD.minus(inputUSD);
	daily.totalValueLockedUSD = getTVL();
	daily.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	daily.xdp2TotalSupply = factory.xdp2TotalSupply;
	calculateDailyTradeVolume(daily);
	daily.save();
}

export function handleMultiLiquidityAdded(event: MultiLiquidityAdded): void {
	let factory = loadFactory();
	let transaction = loadTransaction(event);// just store this transaction, to display last synced block

	let old = event.params.totalLPafter.minus(event.params.LPs); // old is new - difference
	let percentage = event.params.LPs.toBigDecimal().div(old.toBigDecimal()); // new - old / old
	let increase = BigDecimal.fromString("1").plus(percentage); // 1 + percentage
	let dfp2 = loadToken(Address.fromString(DFP2_ADDRESS));

	let tvlBefore = getTVL();

	// Increase tokenAmount of all tokens equally
	for (let i = 0; i < DEX_TOKENS.length; i++) {
		let token = loadToken(DEX_TOKENS[i].address);

		token.tokenAmount = token.tokenAmount.times(increase);
		token.save();
	}

	let tvlAfter = getTVL();
	let tvlDiff = tvlAfter.minus(tvlBefore);

	// Update Factory
	factory.totalValueLockedUSD = tvlAfter;
	factory.dfp2TotalSupply = fetchDFP2TotalSupply();
	factory.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	factory.xdp2TotalSupply = fetchXDP2TotalSupply();
	factory.save();

	// // Update Hourly
	let hourly = loadHourly(event);
	hourly.liquidityCount = hourly.liquidityCount.plus(ONE_BI);
	hourly.liquidityUSD = hourly.liquidityUSD.plus(tvlDiff);
	hourly.liquidityAddedUSD = hourly.liquidityAddedUSD.plus(tvlDiff);
	hourly.totalValueLockedUSD = tvlAfter;
	hourly.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	hourly.xdp2TotalSupply = factory.xdp2TotalSupply;
	calculateHourlyTradeVolume(hourly);
	hourly.save();

	// // Update Daily
	let daily = loadDaily(event);
	daily.liquidityCount = daily.liquidityCount.plus(ONE_BI);
	daily.liquidityUSD = daily.liquidityUSD.plus(tvlDiff);
	daily.liquidityAddedUSD = daily.liquidityAddedUSD.plus(tvlDiff);
	daily.totalValueLockedUSD = tvlAfter;
	daily.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	daily.xdp2TotalSupply = factory.xdp2TotalSupply;
	calculateDailyTradeVolume(daily);
	daily.save();
}

export function handleMultiLiquidityRemoved(event: MultiLiquidityRemoved): void {
	let factory = loadFactory();
	let transaction = loadTransaction(event); // just store this transaction, to display last synced block

	let old = event.params.totalLPafter.plus(event.params.LPs); // old is new + difference
	let percentage = event.params.LPs.toBigDecimal().div(old.toBigDecimal()); // new - old / old
	let increase = BigDecimal.fromString("1").minus(percentage); // 1 - percentage
	let dfp2 = loadToken(Address.fromString(DFP2_ADDRESS));

	let tvlBefore = getTVL();

	// Decrease tokenAmount of all tokens equally
	for (let i = 0; i < DEX_TOKENS.length; i++) {
		let token = loadToken(DEX_TOKENS[i].address);

		token.tokenAmount = token.tokenAmount.times(increase);
		token.save();
	}

	let tvlAfter = getTVL();
	let tvlDiff = tvlAfter.minus(tvlBefore);

	// Update Factory
	factory.totalValueLockedUSD = tvlAfter;
	factory.dfp2TotalSupply = fetchDFP2TotalSupply();
	factory.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	factory.xdp2TotalSupply = fetchXDP2TotalSupply();
	factory.save();

	// // Update Hourly
	let hourly = loadHourly(event);
	hourly.liquidityCount = hourly.liquidityCount.plus(ONE_BI);
	hourly.liquidityUSD = hourly.liquidityUSD.plus(tvlDiff);
	hourly.liquidityRemovedUSD = hourly.liquidityRemovedUSD.minus(tvlDiff);
	hourly.totalValueLockedUSD = tvlAfter;
	hourly.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	hourly.xdp2TotalSupply = factory.xdp2TotalSupply;
	calculateHourlyTradeVolume(hourly);
	hourly.save();

	// // Update Daily
	let daily = loadDaily(event);
	daily.liquidityCount = daily.liquidityCount.plus(ONE_BI);
	daily.liquidityUSD = daily.liquidityUSD.plus(tvlDiff);
	daily.liquidityRemovedUSD = daily.liquidityRemovedUSD.minus(tvlDiff);
	daily.totalValueLockedUSD = tvlAfter;
	daily.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	daily.xdp2TotalSupply = factory.xdp2TotalSupply;
	calculateDailyTradeVolume(daily);
	daily.save();
}

export function handleSwapped(event: Swapped): void {
	let factory = loadFactory();
	let transaction = loadTransaction(event);
	let inputToken = loadToken(event.params.inputToken);
	let outputToken = loadToken(event.params.outputToken);
	let inputDexToken = DexToken.getToken(event.params.inputToken);
	let outputDexToken = DexToken.getToken(event.params.outputToken);
	let inputAmount = convertAmountToDecimal(event.params.inputAmount, inputDexToken.decimals);
	let outputAmount = convertAmountToDecimal(event.params.outputAmount, outputDexToken.decimals);
	let pair = loadPair(inputToken, outputToken);   

	// Calculate swap volume
	let inputPercentage = inputAmount.div(inputToken.tokenAmount);
	let outputPercentage = outputAmount.div(outputToken.tokenAmount);
	let averageUSD = getAverageUSD();
	let inputUSD = averageUSD.times(inputPercentage);
	let outputUSD = averageUSD.times(outputPercentage);
	let averageSwapUSD = (inputUSD.plus(outputUSD)).div(BigDecimal.fromString("2"));

	// Create Swap
	let swap = new Swap(transaction.id);
	swap.transaction = transaction.id;
	swap.timestamp = event.block.timestamp;
	swap.sender = event.params.sender;
	swap.inputToken = inputToken.id;
	swap.outputToken = outputToken.id;
	swap.inputAmount = inputAmount
	swap.outputAmount = outputAmount;
	swap.swapUSD = averageSwapUSD;
	swap.pair = pair.id;

	swap.save();

	inputToken.tokenAmount = inputToken.tokenAmount.plus(inputAmount);
	inputToken.swapCount = inputToken.swapCount.plus(ONE_BI);
	inputToken.tokenPriceUSD = getAverageUSD().div(inputToken.tokenAmount);
	inputToken.save();

	outputToken.tokenAmount = outputToken.tokenAmount.minus(outputAmount);
	// Only track inputToken swapCount
	// outputToken.swapCount = outputToken.swapCount.plus(ONE_BI);
	outputToken.tokenPriceUSD = getAverageUSD().div(outputToken.tokenAmount);
	outputToken.save();

	pair.swapCount = pair.swapCount.plus(ONE_BI);
	pair.save();

	let dfp2 = loadToken(Address.fromString(DFP2_ADDRESS));

	// Update Factory
	factory.swapCount = factory.swapCount.plus(ONE_BI);
	factory.dfp2TotalSupply = fetchDFP2TotalSupply();
	factory.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	factory.save();

	// Update Hourly
	let hourly = loadHourly(event);
	hourly.swapCount = hourly.swapCount.plus(ONE_BI);
	hourly.swapUSD = hourly.swapUSD.plus(averageSwapUSD);
	hourly.totalValueLockedUSD = getTVL();
	hourly.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	calculateHourlyTradeVolume(hourly);
	hourly.save();

	let hourlyToken = loadHourlyToken(event, inputToken);
	hourlyToken.swapCount = hourly.swapCount.plus(ONE_BI);
	hourlyToken.swapUSD = hourly.swapUSD.plus(averageSwapUSD);
	hourlyToken.tokenAmount = inputToken.tokenAmount;
	hourlyToken.tokenPriceUSD = getAverageUSD().div(inputToken.tokenAmount);

	if (hourlyToken.tokenPriceMin.equals(ZERO_BD) || hourlyToken.tokenPriceMin.gt(hourlyToken.tokenPriceUSD)) {
		hourlyToken.tokenPriceMin = hourlyToken.tokenPriceUSD;
	}

	if (hourlyToken.tokenPriceMax.equals(ZERO_BD) || hourlyToken.tokenPriceMax.lt(hourlyToken.tokenPriceUSD)) {
		hourlyToken.tokenPriceMax = hourlyToken.tokenPriceUSD;
	}

	hourlyToken.save();

	// Also update outputToken price
	let hourlyOutToken = loadHourlyToken(event, outputToken);
	hourlyOutToken.tokenAmount = outputToken.tokenAmount;
	hourlyOutToken.tokenPriceUSD = getAverageUSD().div(outputToken.tokenAmount);

	if (hourlyOutToken.tokenPriceMin.equals(ZERO_BD) || hourlyOutToken.tokenPriceMin.gt(hourlyOutToken.tokenPriceUSD)) {
		hourlyOutToken.tokenPriceMin = hourlyOutToken.tokenPriceUSD;
	}

	if (hourlyOutToken.tokenPriceMax.equals(ZERO_BD) || hourlyOutToken.tokenPriceMax.lt(hourlyOutToken.tokenPriceUSD)) {
		hourlyOutToken.tokenPriceMax = hourlyOutToken.tokenPriceUSD;
	}

	hourlyOutToken.save();


	// Update Daily
	let daily = loadDaily(event);
	daily.swapCount = daily.swapCount.plus(ONE_BI);
	daily.swapUSD = daily.swapUSD.plus(averageSwapUSD);
	daily.totalValueLockedUSD = getTVL();
	daily.dfp2MarketCap = factory.dfp2TotalSupply.times(dfp2.tokenPriceUSD);
	calculateDailyTradeVolume(daily);
	daily.save();

	let dailyToken = loadDailyToken(event, inputToken);
	dailyToken.swapCount = daily.swapCount.plus(ONE_BI);
	dailyToken.swapUSD = daily.swapUSD.plus(averageSwapUSD);
	dailyToken.tokenAmount = inputToken.tokenAmount;
	dailyToken.tokenPriceUSD = getAverageUSD().div(inputToken.tokenAmount);

	if (dailyToken.tokenPriceMin.equals(ZERO_BD) || dailyToken.tokenPriceMin.gt(dailyToken.tokenPriceUSD)) {
		dailyToken.tokenPriceMin = dailyToken.tokenPriceUSD;
	}

	if (dailyToken.tokenPriceMax.equals(ZERO_BD) || dailyToken.tokenPriceMax.lt(dailyToken.tokenPriceUSD)) {
		dailyToken.tokenPriceMax = dailyToken.tokenPriceUSD;
	}

	dailyToken.save();

	let dailyOutToken = loadDailyToken(event, outputToken);
	dailyOutToken.tokenAmount = outputToken.tokenAmount;
	dailyOutToken.tokenPriceUSD = getAverageUSD().div(outputToken.tokenAmount);

	if (dailyOutToken.tokenPriceMin.equals(ZERO_BD) || dailyOutToken.tokenPriceMin.gt(dailyToken.tokenPriceUSD)) {
		dailyOutToken.tokenPriceMin = dailyOutToken.tokenPriceUSD;
	}

	if (dailyOutToken.tokenPriceMax.equals(ZERO_BD) || dailyOutToken.tokenPriceMax.lt(dailyToken.tokenPriceUSD)) {
		dailyOutToken.tokenPriceMax = dailyOutToken.tokenPriceUSD;
	}

	dailyOutToken.save();
}

export function handleApproval(event: Approval): void { }

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

export function handleTransfer(event: Transfer): void { }

export function handleBootstrapBonus(event: BootstrapBonus): void { }

export function handleBootstrapCompleted(event: BootstrapCompleted): void { }

export function handleBootstrapped(event: Bootstrapped): void {
	let factory = loadFactory();
	let transaction = loadTransaction(event);
	
	let inputToken = loadToken(event.params.inputToken);
	let outputToken = loadToken(event.params.outputToken);
	let inputDexToken = DexToken.getToken(event.params.inputToken);
	let outputDexToken = DexToken.getToken(event.params.outputToken);
	let inputAmount = convertAmountToDecimal(event.params.inputAmount, inputDexToken.decimals);
	let outputAmount = convertAmountToDecimal(event.params.outputAmount, outputDexToken.decimals);
	let pair = loadPair(inputToken, outputToken);

	inputToken.tokenAmount = inputToken.tokenAmount.plus(inputAmount);
	inputToken.save();

	outputToken.tokenAmount = outputToken.tokenAmount.minus(outputAmount);
	outputToken.save();
}
