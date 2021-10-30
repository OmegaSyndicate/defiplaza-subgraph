// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("transaction", Value.fromString(""));
    this.set("sender", Value.fromBytes(Bytes.empty()));
    this.set("pair", Value.fromString(""));
    this.set("inputToken", Value.fromString(""));
    this.set("outputToken", Value.fromString(""));
    this.set("inputAmount", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("outputAmount", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("swapUSD", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Swap entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value!.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get pair(): string {
    let value = this.get("pair");
    return value!.toString();
  }

  set pair(value: string) {
    this.set("pair", Value.fromString(value));
  }

  get inputToken(): string {
    let value = this.get("inputToken");
    return value!.toString();
  }

  set inputToken(value: string) {
    this.set("inputToken", Value.fromString(value));
  }

  get outputToken(): string {
    let value = this.get("outputToken");
    return value!.toString();
  }

  set outputToken(value: string) {
    this.set("outputToken", Value.fromString(value));
  }

  get inputAmount(): BigDecimal {
    let value = this.get("inputAmount");
    return value!.toBigDecimal();
  }

  set inputAmount(value: BigDecimal) {
    this.set("inputAmount", Value.fromBigDecimal(value));
  }

  get outputAmount(): BigDecimal {
    let value = this.get("outputAmount");
    return value!.toBigDecimal();
  }

  set outputAmount(value: BigDecimal) {
    this.set("outputAmount", Value.fromBigDecimal(value));
  }

  get swapUSD(): BigDecimal {
    let value = this.get("swapUSD");
    return value!.toBigDecimal();
  }

  set swapUSD(value: BigDecimal) {
    this.set("swapUSD", Value.fromBigDecimal(value));
  }
}

export class Pair extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("baseToken", Value.fromString(""));
    this.set("quoteToken", Value.fromString(""));
    this.set("swapCount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pair entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Pair entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Pair", id.toString(), this);
    }
  }

  static load(id: string): Pair | null {
    return changetype<Pair | null>(store.get("Pair", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get baseToken(): string {
    let value = this.get("baseToken");
    return value!.toString();
  }

  set baseToken(value: string) {
    this.set("baseToken", Value.fromString(value));
  }

  get quoteToken(): string {
    let value = this.get("quoteToken");
    return value!.toString();
  }

  set quoteToken(value: string) {
    this.set("quoteToken", Value.fromString(value));
  }

  get swapCount(): BigInt {
    let value = this.get("swapCount");
    return value!.toBigInt();
  }

  set swapCount(value: BigInt) {
    this.set("swapCount", Value.fromBigInt(value));
  }
}

export class Factory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("swapCount", Value.fromBigInt(BigInt.zero()));
    this.set("totalValueLockedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("dfp2TotalSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("xdp2TotalSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("dfp2MarketCap", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Factory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Factory entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Factory", id.toString(), this);
    }
  }

  static load(id: string): Factory | null {
    return changetype<Factory | null>(store.get("Factory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get swapCount(): BigInt {
    let value = this.get("swapCount");
    return value!.toBigInt();
  }

  set swapCount(value: BigInt) {
    this.set("swapCount", Value.fromBigInt(value));
  }

  get totalValueLockedUSD(): BigDecimal {
    let value = this.get("totalValueLockedUSD");
    return value!.toBigDecimal();
  }

  set totalValueLockedUSD(value: BigDecimal) {
    this.set("totalValueLockedUSD", Value.fromBigDecimal(value));
  }

  get dfp2TotalSupply(): BigDecimal {
    let value = this.get("dfp2TotalSupply");
    return value!.toBigDecimal();
  }

  set dfp2TotalSupply(value: BigDecimal) {
    this.set("dfp2TotalSupply", Value.fromBigDecimal(value));
  }

  get xdp2TotalSupply(): BigDecimal {
    let value = this.get("xdp2TotalSupply");
    return value!.toBigDecimal();
  }

  set xdp2TotalSupply(value: BigDecimal) {
    this.set("xdp2TotalSupply", Value.fromBigDecimal(value));
  }

  get dfp2MarketCap(): BigDecimal {
    let value = this.get("dfp2MarketCap");
    return value!.toBigDecimal();
  }

  set dfp2MarketCap(value: BigDecimal) {
    this.set("dfp2MarketCap", Value.fromBigDecimal(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("swapCount", Value.fromBigInt(BigInt.zero()));
    this.set("symbol", Value.fromString(""));
    this.set("tokenAmount", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenPriceUSD", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Token entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get swapCount(): BigInt {
    let value = this.get("swapCount");
    return value!.toBigInt();
  }

  set swapCount(value: BigInt) {
    this.set("swapCount", Value.fromBigInt(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get tokenAmount(): BigDecimal {
    let value = this.get("tokenAmount");
    return value!.toBigDecimal();
  }

  set tokenAmount(value: BigDecimal) {
    this.set("tokenAmount", Value.fromBigDecimal(value));
  }

  get tokenPriceUSD(): BigDecimal {
    let value = this.get("tokenPriceUSD");
    return value!.toBigDecimal();
  }

  set tokenPriceUSD(value: BigDecimal) {
    this.set("tokenPriceUSD", Value.fromBigDecimal(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("blockNumber", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("gasLimit", Value.fromBigInt(BigInt.zero()));
    this.set("gasPrice", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transaction entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get gasLimit(): BigInt {
    let value = this.get("gasLimit");
    return value!.toBigInt();
  }

  set gasLimit(value: BigInt) {
    this.set("gasLimit", Value.fromBigInt(value));
  }

  get gasPrice(): BigInt {
    let value = this.get("gasPrice");
    return value!.toBigInt();
  }

  set gasPrice(value: BigInt) {
    this.set("gasPrice", Value.fromBigInt(value));
  }
}

export class Daily extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("date", Value.fromI32(0));
    this.set("swapCount", Value.fromBigInt(BigInt.zero()));
    this.set("swapUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("liquidityCount", Value.fromBigInt(BigInt.zero()));
    this.set("liquidityUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("liquidityAddedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("liquidityRemovedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalValueLockedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tradeVolumeUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("dfp2MarketCap", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("xdp2TotalSupply", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Daily entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Daily entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Daily", id.toString(), this);
    }
  }

  static load(id: string): Daily | null {
    return changetype<Daily | null>(store.get("Daily", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get date(): i32 {
    let value = this.get("date");
    return value!.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get swapCount(): BigInt {
    let value = this.get("swapCount");
    return value!.toBigInt();
  }

  set swapCount(value: BigInt) {
    this.set("swapCount", Value.fromBigInt(value));
  }

  get swapUSD(): BigDecimal {
    let value = this.get("swapUSD");
    return value!.toBigDecimal();
  }

  set swapUSD(value: BigDecimal) {
    this.set("swapUSD", Value.fromBigDecimal(value));
  }

  get liquidityCount(): BigInt {
    let value = this.get("liquidityCount");
    return value!.toBigInt();
  }

  set liquidityCount(value: BigInt) {
    this.set("liquidityCount", Value.fromBigInt(value));
  }

  get liquidityUSD(): BigDecimal {
    let value = this.get("liquidityUSD");
    return value!.toBigDecimal();
  }

  set liquidityUSD(value: BigDecimal) {
    this.set("liquidityUSD", Value.fromBigDecimal(value));
  }

  get liquidityAddedUSD(): BigDecimal {
    let value = this.get("liquidityAddedUSD");
    return value!.toBigDecimal();
  }

  set liquidityAddedUSD(value: BigDecimal) {
    this.set("liquidityAddedUSD", Value.fromBigDecimal(value));
  }

  get liquidityRemovedUSD(): BigDecimal {
    let value = this.get("liquidityRemovedUSD");
    return value!.toBigDecimal();
  }

  set liquidityRemovedUSD(value: BigDecimal) {
    this.set("liquidityRemovedUSD", Value.fromBigDecimal(value));
  }

  get totalValueLockedUSD(): BigDecimal {
    let value = this.get("totalValueLockedUSD");
    return value!.toBigDecimal();
  }

  set totalValueLockedUSD(value: BigDecimal) {
    this.set("totalValueLockedUSD", Value.fromBigDecimal(value));
  }

  get tradeVolumeUSD(): BigDecimal {
    let value = this.get("tradeVolumeUSD");
    return value!.toBigDecimal();
  }

  set tradeVolumeUSD(value: BigDecimal) {
    this.set("tradeVolumeUSD", Value.fromBigDecimal(value));
  }

  get dfp2MarketCap(): BigDecimal {
    let value = this.get("dfp2MarketCap");
    return value!.toBigDecimal();
  }

  set dfp2MarketCap(value: BigDecimal) {
    this.set("dfp2MarketCap", Value.fromBigDecimal(value));
  }

  get xdp2TotalSupply(): BigDecimal {
    let value = this.get("xdp2TotalSupply");
    return value!.toBigDecimal();
  }

  set xdp2TotalSupply(value: BigDecimal) {
    this.set("xdp2TotalSupply", Value.fromBigDecimal(value));
  }
}

export class Hourly extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("date", Value.fromI32(0));
    this.set("swapCount", Value.fromBigInt(BigInt.zero()));
    this.set("swapUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("liquidityCount", Value.fromBigInt(BigInt.zero()));
    this.set("liquidityUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("liquidityAddedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("liquidityRemovedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalValueLockedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tradeVolumeUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("dfp2MarketCap", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("xdp2TotalSupply", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Hourly entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Hourly entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Hourly", id.toString(), this);
    }
  }

  static load(id: string): Hourly | null {
    return changetype<Hourly | null>(store.get("Hourly", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get date(): i32 {
    let value = this.get("date");
    return value!.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get swapCount(): BigInt {
    let value = this.get("swapCount");
    return value!.toBigInt();
  }

  set swapCount(value: BigInt) {
    this.set("swapCount", Value.fromBigInt(value));
  }

  get swapUSD(): BigDecimal {
    let value = this.get("swapUSD");
    return value!.toBigDecimal();
  }

  set swapUSD(value: BigDecimal) {
    this.set("swapUSD", Value.fromBigDecimal(value));
  }

  get liquidityCount(): BigInt {
    let value = this.get("liquidityCount");
    return value!.toBigInt();
  }

  set liquidityCount(value: BigInt) {
    this.set("liquidityCount", Value.fromBigInt(value));
  }

  get liquidityUSD(): BigDecimal {
    let value = this.get("liquidityUSD");
    return value!.toBigDecimal();
  }

  set liquidityUSD(value: BigDecimal) {
    this.set("liquidityUSD", Value.fromBigDecimal(value));
  }

  get liquidityAddedUSD(): BigDecimal {
    let value = this.get("liquidityAddedUSD");
    return value!.toBigDecimal();
  }

  set liquidityAddedUSD(value: BigDecimal) {
    this.set("liquidityAddedUSD", Value.fromBigDecimal(value));
  }

  get liquidityRemovedUSD(): BigDecimal {
    let value = this.get("liquidityRemovedUSD");
    return value!.toBigDecimal();
  }

  set liquidityRemovedUSD(value: BigDecimal) {
    this.set("liquidityRemovedUSD", Value.fromBigDecimal(value));
  }

  get totalValueLockedUSD(): BigDecimal {
    let value = this.get("totalValueLockedUSD");
    return value!.toBigDecimal();
  }

  set totalValueLockedUSD(value: BigDecimal) {
    this.set("totalValueLockedUSD", Value.fromBigDecimal(value));
  }

  get tradeVolumeUSD(): BigDecimal {
    let value = this.get("tradeVolumeUSD");
    return value!.toBigDecimal();
  }

  set tradeVolumeUSD(value: BigDecimal) {
    this.set("tradeVolumeUSD", Value.fromBigDecimal(value));
  }

  get dfp2MarketCap(): BigDecimal {
    let value = this.get("dfp2MarketCap");
    return value!.toBigDecimal();
  }

  set dfp2MarketCap(value: BigDecimal) {
    this.set("dfp2MarketCap", Value.fromBigDecimal(value));
  }

  get xdp2TotalSupply(): BigDecimal {
    let value = this.get("xdp2TotalSupply");
    return value!.toBigDecimal();
  }

  set xdp2TotalSupply(value: BigDecimal) {
    this.set("xdp2TotalSupply", Value.fromBigDecimal(value));
  }
}

export class DailyToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("date", Value.fromI32(0));
    this.set("token", Value.fromString(""));
    this.set("swapCount", Value.fromBigInt(BigInt.zero()));
    this.set("swapUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenAmount", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenPriceUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenPriceMin", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenPriceMax", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DailyToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DailyToken entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DailyToken", id.toString(), this);
    }
  }

  static load(id: string): DailyToken | null {
    return changetype<DailyToken | null>(store.get("DailyToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get date(): i32 {
    let value = this.get("date");
    return value!.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get swapCount(): BigInt {
    let value = this.get("swapCount");
    return value!.toBigInt();
  }

  set swapCount(value: BigInt) {
    this.set("swapCount", Value.fromBigInt(value));
  }

  get swapUSD(): BigDecimal {
    let value = this.get("swapUSD");
    return value!.toBigDecimal();
  }

  set swapUSD(value: BigDecimal) {
    this.set("swapUSD", Value.fromBigDecimal(value));
  }

  get tokenAmount(): BigDecimal {
    let value = this.get("tokenAmount");
    return value!.toBigDecimal();
  }

  set tokenAmount(value: BigDecimal) {
    this.set("tokenAmount", Value.fromBigDecimal(value));
  }

  get tokenPriceUSD(): BigDecimal {
    let value = this.get("tokenPriceUSD");
    return value!.toBigDecimal();
  }

  set tokenPriceUSD(value: BigDecimal) {
    this.set("tokenPriceUSD", Value.fromBigDecimal(value));
  }

  get tokenPriceMin(): BigDecimal {
    let value = this.get("tokenPriceMin");
    return value!.toBigDecimal();
  }

  set tokenPriceMin(value: BigDecimal) {
    this.set("tokenPriceMin", Value.fromBigDecimal(value));
  }

  get tokenPriceMax(): BigDecimal {
    let value = this.get("tokenPriceMax");
    return value!.toBigDecimal();
  }

  set tokenPriceMax(value: BigDecimal) {
    this.set("tokenPriceMax", Value.fromBigDecimal(value));
  }
}

export class HourlyToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("date", Value.fromI32(0));
    this.set("token", Value.fromString(""));
    this.set("swapCount", Value.fromBigInt(BigInt.zero()));
    this.set("swapUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenAmount", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenPriceUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenPriceMin", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tokenPriceMax", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HourlyToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save HourlyToken entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("HourlyToken", id.toString(), this);
    }
  }

  static load(id: string): HourlyToken | null {
    return changetype<HourlyToken | null>(store.get("HourlyToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get date(): i32 {
    let value = this.get("date");
    return value!.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get swapCount(): BigInt {
    let value = this.get("swapCount");
    return value!.toBigInt();
  }

  set swapCount(value: BigInt) {
    this.set("swapCount", Value.fromBigInt(value));
  }

  get swapUSD(): BigDecimal {
    let value = this.get("swapUSD");
    return value!.toBigDecimal();
  }

  set swapUSD(value: BigDecimal) {
    this.set("swapUSD", Value.fromBigDecimal(value));
  }

  get tokenAmount(): BigDecimal {
    let value = this.get("tokenAmount");
    return value!.toBigDecimal();
  }

  set tokenAmount(value: BigDecimal) {
    this.set("tokenAmount", Value.fromBigDecimal(value));
  }

  get tokenPriceUSD(): BigDecimal {
    let value = this.get("tokenPriceUSD");
    return value!.toBigDecimal();
  }

  set tokenPriceUSD(value: BigDecimal) {
    this.set("tokenPriceUSD", Value.fromBigDecimal(value));
  }

  get tokenPriceMin(): BigDecimal {
    let value = this.get("tokenPriceMin");
    return value!.toBigDecimal();
  }

  set tokenPriceMin(value: BigDecimal) {
    this.set("tokenPriceMin", Value.fromBigDecimal(value));
  }

  get tokenPriceMax(): BigDecimal {
    let value = this.get("tokenPriceMax");
    return value!.toBigDecimal();
  }

  set tokenPriceMax(value: BigDecimal) {
    this.set("tokenPriceMax", Value.fromBigDecimal(value));
  }
}
