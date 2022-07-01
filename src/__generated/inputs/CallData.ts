/*
 * This input type is not interface, because interfaces 
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type CallData = {
    readonly from?: string;
    readonly to?: string;
    readonly gas?: number;
    readonly gasPrice?: string;
    readonly maxFeePerGas?: string;
    readonly maxPriorityFeePerGas?: string;
    readonly value?: string;
    readonly data?: string;
}
