/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { DexToken } from './tokens'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const FACTORY_ADDRESS = '0xe68c1d72340aeefe5be76eda63ae2f4bc7514110'
export const DFP2_ADDRESS = '0x2f57430a6ceda85a67121757785877b4a71b8e6d'
export const XDP2_ADDRESS = FACTORY_ADDRESS

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export let ETHEREUM: DexToken = new DexToken(Address.fromString("0x0000000000000000000000000000000000000000"), "ETH", BI_18, BigDecimal.fromString("10.8"));
export let DFP2: DexToken = new DexToken(Address.fromString(DFP2_ADDRESS), "DFP2", BI_18, BigDecimal.fromString("3600000"));
export let XDP2: DexToken = new DexToken(Address.fromString(DFP2_ADDRESS), "XDP2", BI_18, BigDecimal.fromString("0"));

export let DEX_TOKENS: DexToken[] = [
	new DexToken(Address.fromString("0xc00e94cb662c3520282e6f5717214004a7f26888"), "COMP", BI_18, BigDecimal.fromString("113.013524712069702037")),
	new DexToken(Address.fromString("0xd533a949740bb3306d119cc777fa900ba034cd52"), "CRV", BI_18, BigDecimal.fromString("12875.775811271818938155")),
	new DexToken(Address.fromString("0x6b175474e89094c44da98b954eedeac495271d0f"), "DAI", BI_18, BigDecimal.fromString("37070.31860275076357441")),
	DFP2,
	new DexToken(Address.fromString("0x6468e79a80c0eab0f9a2b574c8d5bc374af59414"), "eXRD", BI_18, BigDecimal.fromString("300000")),
	ETHEREUM,
	new DexToken(Address.fromString("0x514910771af9ca656af840dff83e8264ecf986ca"), "LINK", BI_18, BigDecimal.fromString("1334.723748196549575693")),
	new DexToken(Address.fromString("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"), "MATIC", BI_18, BigDecimal.fromString("27905.030744924501157464")),
	new DexToken(Address.fromString("0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"), "MKR", BI_18, BigDecimal.fromString("14.418835256840613902")),
	new DexToken(Address.fromString("0x6b3595068778dd592e39a122f4f5a5cf09c90fe2"), "SUSHI", BI_18, BigDecimal.fromString("3371.185094288246507112")),
	new DexToken(Address.fromString("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"), "USDC", BigInt.fromI32(6), BigDecimal.fromString("37002.251745")),
	new DexToken(Address.fromString("0xdac17f958d2ee523a2206206994597c13d831ec7"), "USDT", BigInt.fromI32(6), BigDecimal.fromString("36943.755491")),
	new DexToken(Address.fromString("0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"), "YFI", BI_18, BigDecimal.fromString("1.162270610233056559")),
	new DexToken(Address.fromString("0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"), "WBTC", BigInt.fromI32(8), BigDecimal.fromString("0.76385947")),
	
	// Swapped in tokens. Initial amount is populated via events
	new DexToken(Address.fromString("0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b"), "CVX", BI_18, BigDecimal.fromString("0")),
	new DexToken(Address.fromString("0x090185f2135308bad17527004364ebcc2d37e5f6"), "SPELL", BI_18, BigDecimal.fromString("0")),

	// Swapped out tokens. Left in for history preservation. Will show up with tokenAmount <= 0 in current responses.
	new DexToken(Address.fromString("0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"), "AAVE", BI_18, BigDecimal.fromString("117.484726427793069741")),
	new DexToken(Address.fromString("0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"), "UNI", BI_18, BigDecimal.fromString("1411.640980158853417769")),
];

export let STABLE_COINS: DexToken[] = [
	DexToken.getToken(Address.fromString("0xdac17f958d2ee523a2206206994597c13d831ec7")), // USDT
	DexToken.getToken(Address.fromString("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")), // USDC
	DexToken.getToken(Address.fromString("0x6b175474e89094c44da98b954eedeac495271d0f"))  // DAI
];


