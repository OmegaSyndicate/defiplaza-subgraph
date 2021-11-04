import { Staked, Unstaked } from "../generated/DFP2/DFP2";
import { BI_18 } from "./constants";
import { convertAmountToDecimal, fetchXDP2TotalSupply, loadFactory } from "./util";

export function handleStaked(event: Staked): void {
	let factory = loadFactory();
	factory.xdp2Staked = factory.xdp2Staked.plus(convertAmountToDecimal(event.params.LPamount, BI_18));
	factory.xdp2TotalSupply = fetchXDP2TotalSupply();
	factory.save();
}

export function handleUnstaked(event: Unstaked): void {
	let factory = loadFactory();
	factory.xdp2Staked = factory.xdp2Staked.minus(convertAmountToDecimal(event.params.LPamount, BI_18));
	factory.xdp2TotalSupply = fetchXDP2TotalSupply();
	factory.save();
}