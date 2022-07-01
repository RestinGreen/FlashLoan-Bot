/*
 * This input type is not interface, because interfaces 
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type FilterCriteria = {
    readonly fromBlock?: number;
    readonly toBlock?: number;
    readonly addresses?: readonly string[];
    readonly topics?: readonly string[][];
}
