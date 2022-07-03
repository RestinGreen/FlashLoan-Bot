export interface IToken {
    symbol: string;
    decimals: number;
    address: string;
    //TODO recommendedLoan: number; 
  }
  
export type Erc20Token = { [erc20: string]: IToken };

export const Coin : Erc20Token = {
    USDT: {
        symbol: "USDT",
        decimals: 6,
        address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      },
    USDC: {
      symbol: "USDC",
      decimals: 6,
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    },
    DAI: {
        symbol: "DAI",
        decimals: 18,
        address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
    WBTC: {
        symbol: "WBTC",
        decimals: 8,
        address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    },
    WETH: {
        symbol: "WETH",
        decimals: 18,
        address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    },
    WMATIC: {
      symbol: "WMATIC",
      decimals: 18,
      address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    },
    MATIC: {
      symbol: "MATIC",
      decimals: 18,
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    }
}