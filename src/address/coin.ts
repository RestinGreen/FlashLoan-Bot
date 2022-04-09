export interface IToken {
    symbol: string;
    name: string;
    decimals: number;
    address: string;
  }
  
export type Erc20Token = { [erc20: string]: IToken };

export const Coin : Erc20Token = {
    USDC: {
      symbol: "USDC",
      name: "USDC",
      decimals: 6,
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    },
    DAI: {
        symbol: "DAI",
        name: "Dai Stablecoin",
        decimals: 18,
        address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
    WBTC: {
        symbol: "WBTC",
        name: "Wrapped BTC",
        decimals: 8,
        address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    },
    WETH: {
        symbol: "WETH",
        name: "Wrapped Ether",
        decimals: 18,
        address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    },
}