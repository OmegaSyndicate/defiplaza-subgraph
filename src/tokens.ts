import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { ADDRESS_ZERO, BI_18, DEX_TOKENS, ZERO_BD } from "./constants";

export class DexToken {
	address: Address;
	symbol: string;
	decimals: BigInt;
	startAmount: BigDecimal

	constructor(address: Address, symbol: string, decimals: BigInt, startAmount: BigDecimal) {
		this.address = address;
		this.symbol = symbol;
		this.decimals = decimals;
		this.startAmount = startAmount;
	}

	static getToken(address: Address): DexToken {
		let stringAddress = address.toHexString();

		for (let i = 0; i < DEX_TOKENS.length; i++) {
			if (DEX_TOKENS[i].address.toHexString() == stringAddress) {
				return DEX_TOKENS[i];
			}
		}

		// fallback
		return new DexToken(Address.fromString(stringAddress), "Unknown", BI_18, ZERO_BD);
	}
}