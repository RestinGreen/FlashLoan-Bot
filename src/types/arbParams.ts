import BigNumber from "bignumber.js"

export type ArbParams = {
    flashToken: string
    paybackToken: string
    flashAmount: BigNumber
    paybackAmount: BigNumber
    path: string[]
    // pair1Out: BigNumber

} | undefined