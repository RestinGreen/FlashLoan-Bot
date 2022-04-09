import { Contract } from "ethers";

export enum ProtocolTypeEnum {
  UNISWAP_V2,
  UNISWAP_V3,
  DODO,
}

export type ProtocolType = {
  address: string,
  type: ProtocolTypeEnum,
}

export type Protocol = { 
  [router: string]: ProtocolType
};


export const protocols: Protocol = {
    SUSHISWAP:  {address: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", type: ProtocolTypeEnum.UNISWAP_V2},
    QUICKSWAP:  {address: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", type: ProtocolTypeEnum.UNISWAP_V2},
    APESWAP:    {address: "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607", type: ProtocolTypeEnum.UNISWAP_V2},
    JETSWAP:    {address: "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923", type: ProtocolTypeEnum.UNISWAP_V2},
    POLYCAT:    {address: "0x94930a328162957FF1dd48900aF67B5439336cBD", type: ProtocolTypeEnum.UNISWAP_V2},
    WAULTSWAP:  {address: "0x3a1D87f206D12415f5b0A33E786967680AAb4f6d", type: ProtocolTypeEnum.UNISWAP_V2},
    UNISWAP_V3: {address: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", type: ProtocolTypeEnum.UNISWAP_V3},
    //dodo
    //1inch
    //stb kell meg keresni
  };

