import type { AcceptableVariables, UnresolvedVariables, FieldOptions, DirectiveArgs } from 'graphql-ts-client-api';
import { ENUM_INPUT_METADATA } from '../EnumInputMetadata';
import type { ObjectFetcher } from 'graphql-ts-client-api';
import { createFetcher, createFetchableType } from 'graphql-ts-client-api';
import type { WithTypeName, ImplementationType } from '../CommonTypes';
import type {BlockFilterCriteria} from '../inputs';
import type {CallData} from '../inputs';

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 * 
 * So any instance of this interface is reuseable.
 */
export interface BlockFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'Block', T, TVariables> {

    on<XName extends ImplementationType<'Block'>, X extends object, XVariables extends object>(
        child: ObjectFetcher<XName, X, XVariables>, 
        fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
    ): BlockFetcher<
        XName extends 'Block' ?
        T & X :
        WithTypeName<T, ImplementationType<'Block'>> & (
            WithTypeName<X, ImplementationType<XName>> | 
            {__typename: Exclude<ImplementationType<'Block'>, ImplementationType<XName>>}
        ), 
        TVariables & XVariables
    >;


    directive(name: string, args?: DirectiveArgs): BlockFetcher<T, TVariables>;


    readonly __typename: BlockFetcher<T & {__typename: ImplementationType<'Block'>}, TVariables>;


    readonly number: BlockFetcher<T & {readonly "number": number}, TVariables>;

    "number+"<
        XAlias extends string = "number", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"number", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~number": BlockFetcher<Omit<T, 'number'>, TVariables>;


    readonly hash: BlockFetcher<T & {readonly "hash": string}, TVariables>;

    "hash+"<
        XAlias extends string = "hash", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"hash", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~hash": BlockFetcher<Omit<T, 'hash'>, TVariables>;


    parent<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Block', X, XVariables>
    ): BlockFetcher<
        T & {readonly "parent"?: X}, 
        TVariables & XVariables
    >;

    parent<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "parent", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Block', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"parent", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & XDirectiveVariables
    >;


    readonly nonce: BlockFetcher<T & {readonly "nonce": string}, TVariables>;

    "nonce+"<
        XAlias extends string = "nonce", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"nonce", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~nonce": BlockFetcher<Omit<T, 'nonce'>, TVariables>;


    readonly transactionsRoot: BlockFetcher<T & {readonly "transactionsRoot": string}, TVariables>;

    "transactionsRoot+"<
        XAlias extends string = "transactionsRoot", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"transactionsRoot", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~transactionsRoot": BlockFetcher<Omit<T, 'transactionsRoot'>, TVariables>;


    readonly transactionCount: BlockFetcher<T & {readonly "transactionCount"?: number}, TVariables>;

    "transactionCount+"<
        XAlias extends string = "transactionCount", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"transactionCount", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: number}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~transactionCount": BlockFetcher<Omit<T, 'transactionCount'>, TVariables>;


    readonly stateRoot: BlockFetcher<T & {readonly "stateRoot": string}, TVariables>;

    "stateRoot+"<
        XAlias extends string = "stateRoot", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"stateRoot", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~stateRoot": BlockFetcher<Omit<T, 'stateRoot'>, TVariables>;


    readonly receiptsRoot: BlockFetcher<T & {readonly "receiptsRoot": string}, TVariables>;

    "receiptsRoot+"<
        XAlias extends string = "receiptsRoot", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"receiptsRoot", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~receiptsRoot": BlockFetcher<Omit<T, 'receiptsRoot'>, TVariables>;


    miner<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Account', X, XVariables>
    ): BlockFetcher<
        T & {readonly "miner": X}, 
        TVariables & XVariables & BlockArgs["miner"]
    >;

    miner<
        XArgs extends AcceptableVariables<BlockArgs['miner']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>
    ): BlockFetcher<
        T & {readonly "miner": X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['miner']>
    >;

    miner<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "miner", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"miner", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & BlockArgs["miner"] & XDirectiveVariables
    >;

    miner<
        XArgs extends AcceptableVariables<BlockArgs['miner']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "miner", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"miner", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['miner']> & XDirectiveVariables
    >;


    readonly extraData: BlockFetcher<T & {readonly "extraData": string}, TVariables>;

    "extraData+"<
        XAlias extends string = "extraData", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"extraData", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~extraData": BlockFetcher<Omit<T, 'extraData'>, TVariables>;


    readonly gasLimit: BlockFetcher<T & {readonly "gasLimit": number}, TVariables>;

    "gasLimit+"<
        XAlias extends string = "gasLimit", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"gasLimit", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~gasLimit": BlockFetcher<Omit<T, 'gasLimit'>, TVariables>;


    readonly gasUsed: BlockFetcher<T & {readonly "gasUsed": number}, TVariables>;

    "gasUsed+"<
        XAlias extends string = "gasUsed", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"gasUsed", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~gasUsed": BlockFetcher<Omit<T, 'gasUsed'>, TVariables>;


    readonly baseFeePerGas: BlockFetcher<T & {readonly "baseFeePerGas"?: string}, TVariables>;

    "baseFeePerGas+"<
        XAlias extends string = "baseFeePerGas", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"baseFeePerGas", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: string}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~baseFeePerGas": BlockFetcher<Omit<T, 'baseFeePerGas'>, TVariables>;


    readonly nextBaseFeePerGas: BlockFetcher<T & {readonly "nextBaseFeePerGas"?: string}, TVariables>;

    "nextBaseFeePerGas+"<
        XAlias extends string = "nextBaseFeePerGas", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"nextBaseFeePerGas", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: string}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~nextBaseFeePerGas": BlockFetcher<Omit<T, 'nextBaseFeePerGas'>, TVariables>;


    readonly timestamp: BlockFetcher<T & {readonly "timestamp": number}, TVariables>;

    "timestamp+"<
        XAlias extends string = "timestamp", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"timestamp", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~timestamp": BlockFetcher<Omit<T, 'timestamp'>, TVariables>;


    readonly logsBloom: BlockFetcher<T & {readonly "logsBloom": string}, TVariables>;

    "logsBloom+"<
        XAlias extends string = "logsBloom", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"logsBloom", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~logsBloom": BlockFetcher<Omit<T, 'logsBloom'>, TVariables>;


    readonly mixHash: BlockFetcher<T & {readonly "mixHash": string}, TVariables>;

    "mixHash+"<
        XAlias extends string = "mixHash", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"mixHash", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~mixHash": BlockFetcher<Omit<T, 'mixHash'>, TVariables>;


    readonly difficulty: BlockFetcher<T & {readonly "difficulty": string}, TVariables>;

    "difficulty+"<
        XAlias extends string = "difficulty", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"difficulty", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~difficulty": BlockFetcher<Omit<T, 'difficulty'>, TVariables>;


    readonly totalDifficulty: BlockFetcher<T & {readonly "totalDifficulty": string}, TVariables>;

    "totalDifficulty+"<
        XAlias extends string = "totalDifficulty", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"totalDifficulty", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~totalDifficulty": BlockFetcher<Omit<T, 'totalDifficulty'>, TVariables>;


    readonly ommerCount: BlockFetcher<T & {readonly "ommerCount"?: number}, TVariables>;

    "ommerCount+"<
        XAlias extends string = "ommerCount", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"ommerCount", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: number}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~ommerCount": BlockFetcher<Omit<T, 'ommerCount'>, TVariables>;


    ommers<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Block', X, XVariables>
    ): BlockFetcher<
        T & {readonly "ommers"?: ReadonlyArray<X | undefined>}, 
        TVariables & XVariables
    >;

    ommers<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "ommers", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Block', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"ommers", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: ReadonlyArray<X | undefined>}, 
        TVariables & XVariables & XDirectiveVariables
    >;


    ommerAt<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Block', X, XVariables>
    ): BlockFetcher<
        T & {readonly "ommerAt"?: X}, 
        TVariables & XVariables & BlockArgs["ommerAt"]
    >;

    ommerAt<
        XArgs extends AcceptableVariables<BlockArgs['ommerAt']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Block', X, XVariables>
    ): BlockFetcher<
        T & {readonly "ommerAt"?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['ommerAt']>
    >;

    ommerAt<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "ommerAt", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Block', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"ommerAt", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & BlockArgs["ommerAt"] & XDirectiveVariables
    >;

    ommerAt<
        XArgs extends AcceptableVariables<BlockArgs['ommerAt']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "ommerAt", 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Block', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"ommerAt", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['ommerAt']> & XDirectiveVariables
    >;


    readonly ommerHash: BlockFetcher<T & {readonly "ommerHash": string}, TVariables>;

    "ommerHash+"<
        XAlias extends string = "ommerHash", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"ommerHash", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~ommerHash": BlockFetcher<Omit<T, 'ommerHash'>, TVariables>;


    transactions<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>
    ): BlockFetcher<
        T & {readonly "transactions"?: readonly X[]}, 
        TVariables & XVariables
    >;

    transactions<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "transactions", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"transactions", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: readonly X[]}, 
        TVariables & XVariables & XDirectiveVariables
    >;


    transactionAt<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>
    ): BlockFetcher<
        T & {readonly "transactionAt"?: X}, 
        TVariables & XVariables & BlockArgs["transactionAt"]
    >;

    transactionAt<
        XArgs extends AcceptableVariables<BlockArgs['transactionAt']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Transaction', X, XVariables>
    ): BlockFetcher<
        T & {readonly "transactionAt"?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['transactionAt']>
    >;

    transactionAt<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "transactionAt", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"transactionAt", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & BlockArgs["transactionAt"] & XDirectiveVariables
    >;

    transactionAt<
        XArgs extends AcceptableVariables<BlockArgs['transactionAt']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "transactionAt", 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Transaction', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"transactionAt", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['transactionAt']> & XDirectiveVariables
    >;


    logs<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Log', X, XVariables>
    ): BlockFetcher<
        T & {readonly "logs": readonly X[]}, 
        TVariables & XVariables & BlockArgs["logs"]
    >;

    logs<
        XArgs extends AcceptableVariables<BlockArgs['logs']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Log', X, XVariables>
    ): BlockFetcher<
        T & {readonly "logs": readonly X[]}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['logs']>
    >;

    logs<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "logs", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Log', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"logs", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: readonly X[]} : 
                {readonly [key in XAlias]: readonly X[]}
        ), 
        TVariables & XVariables & BlockArgs["logs"] & XDirectiveVariables
    >;

    logs<
        XArgs extends AcceptableVariables<BlockArgs['logs']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "logs", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Log', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"logs", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: readonly X[]} : 
                {readonly [key in XAlias]: readonly X[]}
        ), 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['logs']> & XDirectiveVariables
    >;


    account<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Account', X, XVariables>
    ): BlockFetcher<
        T & {readonly "account": X}, 
        TVariables & XVariables & BlockArgs["account"]
    >;

    account<
        XArgs extends AcceptableVariables<BlockArgs['account']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>
    ): BlockFetcher<
        T & {readonly "account": X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['account']>
    >;

    account<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "account", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"account", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & BlockArgs["account"] & XDirectiveVariables
    >;

    account<
        XArgs extends AcceptableVariables<BlockArgs['account']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "account", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"account", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['account']> & XDirectiveVariables
    >;


    call<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'CallResult', X, XVariables>
    ): BlockFetcher<
        T & {readonly "call"?: X}, 
        TVariables & XVariables & BlockArgs["call"]
    >;

    call<
        XArgs extends AcceptableVariables<BlockArgs['call']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'CallResult', X, XVariables>
    ): BlockFetcher<
        T & {readonly "call"?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['call']>
    >;

    call<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "call", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'CallResult', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"call", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & BlockArgs["call"] & XDirectiveVariables
    >;

    call<
        XArgs extends AcceptableVariables<BlockArgs['call']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "call", 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'CallResult', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"call", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): BlockFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, BlockArgs['call']> & XDirectiveVariables
    >;


    estimateGas(
    ): BlockFetcher<
        T & {readonly "estimateGas": number}, 
        TVariables & BlockArgs["estimateGas"]
    >;

    estimateGas<
        XArgs extends AcceptableVariables<BlockArgs['estimateGas']>
    >(
        args: XArgs
    ): BlockFetcher<
        T & {readonly "estimateGas": number}, 
        TVariables & UnresolvedVariables<XArgs, BlockArgs['estimateGas']>
    >;

    estimateGas<
        XAlias extends string = "estimateGas", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"estimateGas", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & BlockArgs["estimateGas"] & XDirectiveVariables
    >;

    estimateGas<
        XArgs extends AcceptableVariables<BlockArgs['estimateGas']>, 
        XAlias extends string = "estimateGas", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        optionsConfigurer: (
            options: FieldOptions<"estimateGas", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): BlockFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & UnresolvedVariables<XArgs, BlockArgs['estimateGas']> & XDirectiveVariables
    >;
}

export const block$: BlockFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "Block", 
            "EMBEDDED", 
            [], 
            [
                "number", 
                "hash", 
                {
                    category: "SCALAR", 
                    name: "parent", 
                    targetTypeName: "Block", 
                    undefinable: true
                }, 
                "nonce", 
                "transactionsRoot", 
                {
                    category: "SCALAR", 
                    name: "transactionCount", 
                    undefinable: true
                }, 
                "stateRoot", 
                "receiptsRoot", 
                {
                    category: "SCALAR", 
                    name: "miner", 
                    argGraphQLTypeMap: {block: 'Long'}, 
                    targetTypeName: "Account"
                }, 
                "extraData", 
                "gasLimit", 
                "gasUsed", 
                {
                    category: "SCALAR", 
                    name: "baseFeePerGas", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "nextBaseFeePerGas", 
                    undefinable: true
                }, 
                "timestamp", 
                "logsBloom", 
                "mixHash", 
                "difficulty", 
                "totalDifficulty", 
                {
                    category: "SCALAR", 
                    name: "ommerCount", 
                    undefinable: true
                }, 
                {
                    category: "LIST", 
                    name: "ommers", 
                    targetTypeName: "Block", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "ommerAt", 
                    argGraphQLTypeMap: {index: 'Int!'}, 
                    targetTypeName: "Block", 
                    undefinable: true
                }, 
                "ommerHash", 
                {
                    category: "LIST", 
                    name: "transactions", 
                    targetTypeName: "Transaction", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "transactionAt", 
                    argGraphQLTypeMap: {index: 'Int!'}, 
                    targetTypeName: "Transaction", 
                    undefinable: true
                }, 
                {
                    category: "LIST", 
                    name: "logs", 
                    argGraphQLTypeMap: {filter: 'BlockFilterCriteria!'}, 
                    targetTypeName: "Log"
                }, 
                {
                    category: "SCALAR", 
                    name: "account", 
                    argGraphQLTypeMap: {address: 'Address!'}, 
                    targetTypeName: "Account"
                }, 
                {
                    category: "SCALAR", 
                    name: "call", 
                    argGraphQLTypeMap: {data: 'CallData!'}, 
                    targetTypeName: "CallResult", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "estimateGas", 
                    argGraphQLTypeMap: {data: 'CallData!'}
                }
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export const block$$ = 
    block$
        .number
        .hash
        .nonce
        .transactionsRoot
        .transactionCount
        .stateRoot
        .receiptsRoot
        .extraData
        .gasLimit
        .gasUsed
        .baseFeePerGas
        .nextBaseFeePerGas
        .timestamp
        .logsBloom
        .mixHash
        .difficulty
        .totalDifficulty
        .ommerCount
        .ommerHash
;

export interface BlockArgs {

    readonly miner: {
        readonly block?: number
    }, 

    readonly ommerAt: {
        readonly index: number
    }, 

    readonly transactionAt: {
        readonly index: number
    }, 

    readonly logs: {
        readonly filter: BlockFilterCriteria
    }, 

    readonly account: {
        readonly address: string
    }, 

    readonly call: {
        readonly data: CallData
    }, 

    readonly estimateGas: {
        readonly data: CallData
    }
}
