import { BigInt, BigDecimal, ethereum, Address } from '@graphprotocol/graph-ts';
import { ERC20 } from '../generated/Contract/ERC20';
import { Daily, DailyToken, Factory, Hourly, HourlyToken, Pair, Token, Transaction } from '../generated/schema';
import { BI_18, DFP2_ADDRESS, FACTORY_ADDRESS, ONE_BD, ONE_BI, STABLE_COINS, XDP2_ADDRESS, ZERO_BD, ZERO_BI } from './constants';
import { DexToken } from './tokens';

export function loadDaily(event: ethereum.Event): Daily {
	let timestamp = event.block.timestamp.toI32();
	let day = timestamp / 86400;
	let startOfDay = day * 86400;
	let startOfDayString = startOfDay.toString();

	let daily = Daily.load(startOfDayString);

	if (daily == null) {
		daily = new Daily(startOfDayString);
		daily.date = startOfDay;
		daily.swapCount = ZERO_BI;
		daily.swapUSD = ZERO_BD;
		daily.liquidityCount = ZERO_BI;
		daily.liquidityUSD = ZERO_BD;
		daily.liquidityAddedUSD = ZERO_BD;
		daily.liquidityRemovedUSD = ZERO_BD;
		daily.totalValueLockedUSD = getTVL();
		daily.tradeVolumeUSD = ZERO_BD;
		daily.save();
	}

	return daily as Daily;
}

export function loadDailyToken(event: ethereum.Event, token: Token): DailyToken {
	let timestamp = event.block.timestamp.toI32();
	let day = timestamp / 86400;
	let startOfDay = day * 86400;
	let startOfDayString = token.id.toString().concat('-').concat(startOfDay.toString());

	let daily = DailyToken.load(startOfDayString);

	if (daily == null) {
		daily = new DailyToken(startOfDayString);
		daily.date = startOfDay;
		daily.token = token.id;
		daily.swapCount = ZERO_BI;
		daily.swapUSD = ZERO_BD;
		daily.tokenAmount = ZERO_BD;
		daily.save();
	}

	return daily as DailyToken;
}

export function loadFactory(): Factory {
	let factory = Factory.load(FACTORY_ADDRESS);

	if (factory === null) {
		factory = new Factory(FACTORY_ADDRESS);
		factory.swapCount = ZERO_BI;
		factory.totalValueLockedUSD = ZERO_BD;
		factory.dfp2TotalSupply = ZERO_BD;
		factory.xdp2TotalSupply = ZERO_BD;
		factory.dfp2MarketCap = ZERO_BD;
		factory.xdp2Staked = ZERO_BD;
		factory.save();
	}

	return factory as Factory;
}

export function loadHourly(event: ethereum.Event): Hourly {
	let timestamp = event.block.timestamp.toI32();
	let hour = timestamp / 3600;
	let startOfHour = hour * 3600;
	let startOfHourString = startOfHour.toString();

	let hourly = Hourly.load(startOfHourString);

	if (hourly == null) {
		hourly = new Hourly(startOfHourString);
		hourly.date = startOfHour;
		hourly.swapCount = ZERO_BI;
		hourly.swapUSD = ZERO_BD;
		hourly.liquidityCount = ZERO_BI;
		hourly.liquidityUSD = ZERO_BD;
		hourly.liquidityAddedUSD = ZERO_BD;
		hourly.liquidityRemovedUSD = ZERO_BD;
		hourly.totalValueLockedUSD = getTVL();
		hourly.tradeVolumeUSD = ZERO_BD;
		hourly.save();
	}

	return hourly as Hourly;
}

export function loadHourlyToken(event: ethereum.Event, token: Token): HourlyToken {
	let timestamp = event.block.timestamp.toI32();
	let hour = timestamp / 3600;
	let startOfHour = hour * 3600;
	let startOfHourString = token.id.toString().concat('-').concat(startOfHour.toString());

	let hourly = HourlyToken.load(startOfHourString);

	if (hourly == null) {
		hourly = new HourlyToken(startOfHourString);
		hourly.date = startOfHour;
		hourly.token = token.id;
		hourly.swapCount = ZERO_BI;
		hourly.swapUSD = ZERO_BD;
		hourly.tokenAmount = ZERO_BD;
		hourly.save();
	}

	return hourly as HourlyToken;
}

export function loadToken(tokenAddress: Address): Token {
	let token = Token.load(tokenAddress.toHexString());

	// Create token if it does not yet exist
	if (token === null) {
		let dexToken = DexToken.getToken(tokenAddress);

		token = new Token(tokenAddress.toHexString());
		token.symbol = dexToken.symbol;
		token.swapCount = ZERO_BI;
		token.tokenAmount = dexToken.startAmount;
	}

	return token as Token;
}

export function loadPair(tokenA: Token, tokenB: Token): Pair {
	let tokens = [tokenA, tokenB].sort((a, b) => {
		if (a.symbol < b.symbol) {
			return -1;
		} else if (a.symbol > b.symbol) {
			return 1;
		} else {
			return 0;
		}
	});

	let pairId = tokens[0].symbol.concat("_").concat(tokens[1].symbol);

	let pair = Pair.load(pairId);

	// Create token if it does not yet exist
	if (pair === null) {
		pair = new Pair(pairId);
		pair.baseToken = tokens[0].id;
		pair.quoteToken = tokens[1].id;
		pair.swapCount = ZERO_BI;
		pair.save();
	}

	return pair as Pair;
}

export function loadTransaction(event: ethereum.Event): Transaction {
	let transaction = Transaction.load(event.transaction.hash.toHexString());

	if (transaction === null) {
		transaction = new Transaction(event.transaction.hash.toHexString());
	}

	transaction.blockNumber = event.block.number;
	transaction.timestamp = event.block.timestamp;
	transaction.gasLimit = event.transaction.gasLimit;
	transaction.gasPrice = event.transaction.gasPrice;
	transaction.save();

	return transaction as Transaction;
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
	let bd = BigDecimal.fromString('1')
	for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
		bd = bd.times(BigDecimal.fromString('10'))
	}
	return bd
}

export function convertAmountToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
	if (exchangeDecimals == ZERO_BI) {
		return tokenAmount.toBigDecimal()
	}
	return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function getAverageUSD(): BigDecimal {
	let totalStable = ZERO_BD;
	let count = ZERO_BD;
	let stableAmount = ZERO_BD;

	for (let i = 0; i < STABLE_COINS.length; i++) {
		let stable = STABLE_COINS[i];
		let stableToken = Token.load(stable.address.toHexString());

		if (stableToken === null) {
			continue;
		}

		totalStable = totalStable.plus(stableToken.tokenAmount);
		count = count.plus(ONE_BD);
	}

	if (count !== ZERO_BD) {
		stableAmount = totalStable.div(count);
	}

	return stableAmount;
}

export function getTVL(): BigDecimal {
	// return average stable coin amount times 16 for TVL when dex is in balance
	return getAverageUSD().times(BigDecimal.fromString("16"));
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
	let contract = ERC20.bind(tokenAddress);
	let totalSupplyValue = ZERO_BI;

	let totalSupplyResult = contract.try_totalSupply();

	if (!totalSupplyResult.reverted) {
		totalSupplyValue = totalSupplyResult.value;
	}
	
	return totalSupplyValue;
}

export function fetchDFP2TotalSupply(): BigDecimal {
	let amount = fetchTokenTotalSupply(Address.fromString(DFP2_ADDRESS));

	return convertAmountToDecimal(amount, BI_18);
}

export function fetchXDP2TotalSupply(): BigDecimal {
	let amount = fetchTokenTotalSupply(Address.fromString(XDP2_ADDRESS));

	return convertAmountToDecimal(amount, BI_18);
}

export function calculateDailyTradeVolume(stats: Daily): Daily {
	let add = stats.liquidityAddedUSD;
	let remove = stats.liquidityRemovedUSD.times(BigDecimal.fromString("-1"));

	if (add.gt(remove)) {
		stats.tradeVolumeUSD = stats.swapUSD.plus(remove);
	} else {
		stats.tradeVolumeUSD = stats.swapUSD.plus(add);
	}

	return stats;
}

export function calculateHourlyTradeVolume(stats: Hourly): Hourly {
	// let add = stats.liquidityAddedUSD;
	// let remove = stats.liquidityRemovedUSD;

	// if (add.gt(remove)) {
	// 	stats.tradeVolumeUSD = stats.swapUSD.plus(remove);
	// } else {
	// 	stats.tradeVolumeUSD = stats.swapUSD.plus(add);
	// }

	return stats;
}