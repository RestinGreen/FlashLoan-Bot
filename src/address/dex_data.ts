import { Contract } from "ethers";

export enum DexType {
  UNISWAP_V2,
  UNISWAP_V3,
  DODO
}

export type DexData = {
  router: string,
  type: DexType,
  factory: string,
  initHash: string
}

export type Dex = { 
  [dex: string]: DexData
};


export const dex_dict: Dex = {
    SUSHISWAP:  {router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", type: DexType.UNISWAP_V2, factory: '0xc35dadb65012ec5796536bd9864ed8773abc74c4', initHash: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'},
    QUICKSWAP:  {router: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", type: DexType.UNISWAP_V2, factory: '0x5757371414417b8c6caad45baef941abc7d3ab32', initHash: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'},
    APESWAP:    {router: "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607", type: DexType.UNISWAP_V2, factory: '0xcf083be4164828f00cae704ec15a36d711491284', initHash: '0x511f0f358fe530cda0859ec20becf391718fdf5a329be02f4c95361f3d6a42d8'},
    JETSWAP:    {router: "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923", type: DexType.UNISWAP_V2, factory: '0x668ad0ed2622c62e24f0d5ab6b6ac1b9d2cd4ac7', initHash: '0x505c843b83f01afef714149e8b174427d552e1aca4834b4f9b4b525f426ff3c6'},
    POLYCAT:    {router: "0x94930a328162957FF1dd48900aF67B5439336cBD", type: DexType.UNISWAP_V2, factory: '0x477ce834ae6b7ab003cce4bc4d8697763ff456fa', initHash: '0x3cad6f9e70e13835b4f07e5dd475f25a109450b22811d0437da51e66c161255a'},
    WAULTSWAP:  {router: "0x3a1D87f206D12415f5b0A33E786967680AAb4f6d", type: DexType.UNISWAP_V2, factory: '0xa98ea6356a316b44bf710d5f9b6b4ea0081409ef', initHash: '0x1cdc2246d318ab84d8bc7ae2a3d81c235f3db4e113f4c6fdc1e2211a9291be47'},
    // UNISWAP_V3: {router: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", type: DexType.UNISWAP_V3, factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984', initHash: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54'},
    // DODO:       {address: "",                                           type: DexType.DODO}
    //stb kell meg keresni
  };

export const address_dex: Map<string, string> = new Map([
  ['0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', 'SUSHISWAP'],
  ['0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff', 'QUICKSWAP'],
  ['0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607', 'APESWAP'],
  ['0x5C6EC38fb0e2609672BDf628B1fD605A523E5923', 'JETSWAP'],
  ['0x94930a328162957FF1dd48900aF67B5439336cBD', 'POLYCAT'],
  ['0x3a1D87f206D12415f5b0A33E786967680AAb4f6d', 'WAULTSWAP'],
  // ['0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', 'UNISWAP_V3']
])