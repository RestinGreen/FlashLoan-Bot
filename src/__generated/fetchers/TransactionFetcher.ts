import type { AcceptableVariables, UnresolvedVariables, FieldOptions, DirectiveArgs } from 'graphql-ts-client-api';
import { ENUM_INPUT_METADATA } from '../EnumInputMetadata';
import type { ObjectFetcher } from 'graphql-ts-client-api';
import { createFetcher, createFetchableType } from 'graphql-ts-client-api';
import type { WithTypeName, ImplementationType } from '../CommonTypes';

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 * 
 * So any instance of this interface is reuseable.
 */
export interface TransactionFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'Transaction', T, TVariables> {

    on<XName extends ImplementationType<'Transaction'>, X extends object, XVariables extends object>(
        child: ObjectFetcher<XName, X, XVariables>, 
        fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
    ): TransactionFetcher<
        XName extends 'Transaction' ?
        T & X :
        WithTypeName<T, ImplementationType<'Transaction'>> & (
            WithTypeName<X, ImplementationType<XName>> | 
            {__typename: Exclude<ImplementationType<'Transaction'>, ImplementationType<XName>>}
        ), 
        TVariables & XVariables
    >;


    directive(name: string, args?: DirectiveArgs): TransactionFetcher<T, TVariables>;


    readonly __typename: TransactionFetcher<T & {__typename: ImplementationType<'Transaction'>}, TVariables>;


    readonly hash: TransactionFetcher<T & {readonly "hash": string}, TVariables>;

    "hash+"<
        XAlias extends string = "hash", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"hash", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~hash": TransactionFetcher<Omit<T, 'hash'>, TVariables>;


    readonly nonce: TransactionFetcher<T & {readonly "nonce": number}, TVariables>;

    "nonce+"<
        XAlias extends string = "nonce", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"nonce", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~nonce": TransactionFetcher<Omit<T, 'nonce'>, TVariables>;


    readonly index: TransactionFetcher<T & {readonly "index"?: number}, TVariables>;

    "index+"<
        XAlias extends string = "index", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"index", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: number}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~index": TransactionFetcher<Omit<T, 'index'>, TVariables>;


    from<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Account', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "from": X}, 
        TVariables & XVariables & TransactionArgs["from"]
    >;

    from<
        XArgs extends AcceptableVariables<TransactionArgs['from']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "from": X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, TransactionArgs['from']>
    >;

    from<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "from", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"from", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & TransactionArgs["from"] & XDirectiveVariables
    >;

    from<
        XArgs extends AcceptableVariables<TransactionArgs['from']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "from", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"from", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & UnresolvedVariables<XArgs, TransactionArgs['from']> & XDirectiveVariables
    >;


    to<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Account', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "to"?: X}, 
        TVariables & XVariables & TransactionArgs["to"]
    >;

    to<
        XArgs extends AcceptableVariables<TransactionArgs['to']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "to"?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, TransactionArgs['to']>
    >;

    to<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "to", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"to", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & TransactionArgs["to"] & XDirectiveVariables
    >;

    to<
        XArgs extends AcceptableVariables<TransactionArgs['to']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "to", 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"to", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, TransactionArgs['to']> & XDirectiveVariables
    >;


    readonly value: TransactionFetcher<T & {readonly "value": string}, TVariables>;

    "value+"<
        XAlias extends string = "value", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"value", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~value": TransactionFetcher<Omit<T, 'value'>, TVariables>;


    readonly gasPrice: TransactionFetcher<T & {readonly "gasPrice": string}, TVariables>;

    "gasPrice+"<
        XAlias extends string = "gasPrice", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"gasPrice", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~gasPrice": TransactionFetcher<Omit<T, 'gasPrice'>, TVariables>;


    readonly maxFeePerGas: TransactionFetcher<T & {readonly "maxFeePerGas"?: string}, TVariables>;

    "maxFeePerGas+"<
        XAlias extends string = "maxFeePerGas", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"maxFeePerGas", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: string}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~maxFeePerGas": TransactionFetcher<Omit<T, 'maxFeePerGas'>, TVariables>;


    readonly maxPriorityFeePerGas: TransactionFetcher<T & {readonly "maxPriorityFeePerGas"?: string}, TVariables>;

    "maxPriorityFeePerGas+"<
        XAlias extends string = "maxPriorityFeePerGas", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"maxPriorityFeePerGas", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: string}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~maxPriorityFeePerGas": TransactionFetcher<Omit<T, 'maxPriorityFeePerGas'>, TVariables>;


    readonly effectiveTip: TransactionFetcher<T & {readonly "effectiveTip"?: string}, TVariables>;

    "effectiveTip+"<
        XAlias extends string = "effectiveTip", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"effectiveTip", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: string}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~effectiveTip": TransactionFetcher<Omit<T, 'effectiveTip'>, TVariables>;


    readonly gas: TransactionFetcher<T & {readonly "gas": number}, TVariables>;

    "gas+"<
        XAlias extends string = "gas", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"gas", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~gas": TransactionFetcher<Omit<T, 'gas'>, TVariables>;


    readonly inputData: TransactionFetcher<T & {readonly "inputData": string}, TVariables>;

    "inputData+"<
        XAlias extends string = "inputData", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"inputData", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~inputData": TransactionFetcher<Omit<T, 'inputData'>, TVariables>;


    block<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Block', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "block"?: X}, 
        TVariables & XVariables
    >;

    block<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "block", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Block', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"block", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & XDirectiveVariables
    >;


    readonly status: TransactionFetcher<T & {readonly "status"?: number}, TVariables>;

    "status+"<
        XAlias extends string = "status", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"status", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: number}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~status": TransactionFetcher<Omit<T, 'status'>, TVariables>;


    readonly gasUsed: TransactionFetcher<T & {readonly "gasUsed"?: number}, TVariables>;

    "gasUsed+"<
        XAlias extends string = "gasUsed", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"gasUsed", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: number}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~gasUsed": TransactionFetcher<Omit<T, 'gasUsed'>, TVariables>;


    readonly cumulativeGasUsed: TransactionFetcher<T & {readonly "cumulativeGasUsed"?: number}, TVariables>;

    "cumulativeGasUsed+"<
        XAlias extends string = "cumulativeGasUsed", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"cumulativeGasUsed", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: number}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~cumulativeGasUsed": TransactionFetcher<Omit<T, 'cumulativeGasUsed'>, TVariables>;


    readonly effectiveGasPrice: TransactionFetcher<T & {readonly "effectiveGasPrice"?: string}, TVariables>;

    "effectiveGasPrice+"<
        XAlias extends string = "effectiveGasPrice", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"effectiveGasPrice", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: string}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~effectiveGasPrice": TransactionFetcher<Omit<T, 'effectiveGasPrice'>, TVariables>;


    createdContract<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Account', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "createdContract"?: X}, 
        TVariables & XVariables & TransactionArgs["createdContract"]
    >;

    createdContract<
        XArgs extends AcceptableVariables<TransactionArgs['createdContract']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "createdContract"?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, TransactionArgs['createdContract']>
    >;

    createdContract<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "createdContract", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"createdContract", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & TransactionArgs["createdContract"] & XDirectiveVariables
    >;

    createdContract<
        XArgs extends AcceptableVariables<TransactionArgs['createdContract']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "createdContract", 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"createdContract", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, TransactionArgs['createdContract']> & XDirectiveVariables
    >;


    logs<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Log', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "logs"?: readonly X[]}, 
        TVariables & XVariables
    >;

    logs<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "logs", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Log', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"logs", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: readonly X[]}, 
        TVariables & XVariables & XDirectiveVariables
    >;


    readonly r: TransactionFetcher<T & {readonly "r": string}, TVariables>;

    "r+"<
        XAlias extends string = "r", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"r", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~r": TransactionFetcher<Omit<T, 'r'>, TVariables>;


    readonly s: TransactionFetcher<T & {readonly "s": string}, TVariables>;

    "s+"<
        XAlias extends string = "s", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"s", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~s": TransactionFetcher<Omit<T, 's'>, TVariables>;


    readonly v: TransactionFetcher<T & {readonly "v": string}, TVariables>;

    "v+"<
        XAlias extends string = "v", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"v", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): TransactionFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~v": TransactionFetcher<Omit<T, 'v'>, TVariables>;


    readonly type: TransactionFetcher<T & {readonly "type"?: number}, TVariables>;

    "type+"<
        XAlias extends string = "type", 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"type", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: number}, 
        TVariables & XDirectiveVariables
    >;

    readonly "~type": TransactionFetcher<Omit<T, 'type'>, TVariables>;


    accessList<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'AccessTuple', X, XVariables>
    ): TransactionFetcher<
        T & {readonly "accessList"?: readonly X[]}, 
        TVariables & XVariables
    >;

    accessList<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "accessList", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'AccessTuple', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"accessList", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): TransactionFetcher<
        T & {readonly [key in XAlias]?: readonly X[]}, 
        TVariables & XVariables & XDirectiveVariables
    >;
}

export const transaction$: TransactionFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "Transaction", 
            "EMBEDDED", 
            [], 
            [
                "hash", 
                "nonce", 
                {
                    category: "SCALAR", 
                    name: "index", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "from", 
                    argGraphQLTypeMap: {block: 'Long'}, 
                    targetTypeName: "Account"
                }, 
                {
                    category: "SCALAR", 
                    name: "to", 
                    argGraphQLTypeMap: {block: 'Long'}, 
                    targetTypeName: "Account", 
                    undefinable: true
                }, 
                "value", 
                "gasPrice", 
                {
                    category: "SCALAR", 
                    name: "maxFeePerGas", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "maxPriorityFeePerGas", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "effectiveTip", 
                    undefinable: true
                }, 
                "gas", 
                "inputData", 
                {
                    category: "SCALAR", 
                    name: "block", 
                    targetTypeName: "Block", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "status", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "gasUsed", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "cumulativeGasUsed", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "effectiveGasPrice", 
                    undefinable: true
                }, 
                {
                    category: "SCALAR", 
                    name: "createdContract", 
                    argGraphQLTypeMap: {block: 'Long'}, 
                    targetTypeName: "Account", 
                    undefinable: true
                }, 
                {
                    category: "LIST", 
                    name: "logs", 
                    targetTypeName: "Log", 
                    undefinable: true
                }, 
                "r", 
                "s", 
                "v", 
                {
                    category: "SCALAR", 
                    name: "type", 
                    undefinable: true
                }, 
                {
                    category: "LIST", 
                    name: "accessList", 
                    targetTypeName: "AccessTuple", 
                    undefinable: true
                }
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export const transaction$$ = 
    transaction$
        .hash
        .nonce
        .index
        .value
        .gasPrice
        .maxFeePerGas
        .maxPriorityFeePerGas
        .effectiveTip
        .gas
        .inputData
        .status
        .gasUsed
        .cumulativeGasUsed
        .effectiveGasPrice
        .r
        .s
        .v
        .type
;

export interface TransactionArgs {

    readonly from: {
        readonly block?: number
    }, 

    readonly to: {
        readonly block?: number
    }, 

    readonly createdContract: {
        readonly block?: number
    }
}
