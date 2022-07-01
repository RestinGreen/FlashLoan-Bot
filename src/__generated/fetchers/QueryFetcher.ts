import type { AcceptableVariables, UnresolvedVariables, FieldOptions, DirectiveArgs } from 'graphql-ts-client-api';
import { ENUM_INPUT_METADATA } from '../EnumInputMetadata';
import type { ObjectFetcher } from 'graphql-ts-client-api';
import { createFetcher, createFetchableType } from 'graphql-ts-client-api';
import type {FilterCriteria} from '../inputs';

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 * 
 * So any instance of this interface is reuseable.
 */
export interface QueryFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'Query', T, TVariables> {


    directive(name: string, args?: DirectiveArgs): QueryFetcher<T, TVariables>;


    block<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Block', X, XVariables>
    ): QueryFetcher<
        T & {readonly "block"?: X}, 
        TVariables & XVariables & QueryArgs["block"]
    >;

    block<
        XArgs extends AcceptableVariables<QueryArgs['block']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Block', X, XVariables>
    ): QueryFetcher<
        T & {readonly "block"?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['block']>
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
    ): QueryFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & QueryArgs["block"] & XDirectiveVariables
    >;

    block<
        XArgs extends AcceptableVariables<QueryArgs['block']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "block", 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Block', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"block", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): QueryFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['block']> & XDirectiveVariables
    >;


    blocks<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Block', X, XVariables>
    ): QueryFetcher<
        T & {readonly "blocks": readonly X[]}, 
        TVariables & XVariables & QueryArgs["blocks"]
    >;

    blocks<
        XArgs extends AcceptableVariables<QueryArgs['blocks']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Block', X, XVariables>
    ): QueryFetcher<
        T & {readonly "blocks": readonly X[]}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['blocks']>
    >;

    blocks<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "blocks", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Block', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"blocks", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): QueryFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: readonly X[]} : 
                {readonly [key in XAlias]: readonly X[]}
        ), 
        TVariables & XVariables & QueryArgs["blocks"] & XDirectiveVariables
    >;

    blocks<
        XArgs extends AcceptableVariables<QueryArgs['blocks']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "blocks", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Block', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"blocks", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): QueryFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: readonly X[]} : 
                {readonly [key in XAlias]: readonly X[]}
        ), 
        TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['blocks']> & XDirectiveVariables
    >;


    pending<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Pending', X, XVariables>
    ): QueryFetcher<
        T & {readonly "pending": X}, 
        TVariables & XVariables
    >;

    pending<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "pending", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Pending', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"pending", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): QueryFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & XDirectiveVariables
    >;


    transaction<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>
    ): QueryFetcher<
        T & {readonly "transaction"?: X}, 
        TVariables & XVariables & QueryArgs["transaction"]
    >;

    transaction<
        XArgs extends AcceptableVariables<QueryArgs['transaction']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Transaction', X, XVariables>
    ): QueryFetcher<
        T & {readonly "transaction"?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['transaction']>
    >;

    transaction<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "transaction", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"transaction", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): QueryFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & QueryArgs["transaction"] & XDirectiveVariables
    >;

    transaction<
        XArgs extends AcceptableVariables<QueryArgs['transaction']>, 
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "transaction", 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        child: ObjectFetcher<'Transaction', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"transaction", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): QueryFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['transaction']> & XDirectiveVariables
    >;


    logs<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Log', X, XVariables>
    ): QueryFetcher<
        T & {readonly "logs": readonly X[]}, 
        TVariables & XVariables & QueryArgs["logs"]
    >;

    logs<
        XArgs extends AcceptableVariables<QueryArgs['logs']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Log', X, XVariables>
    ): QueryFetcher<
        T & {readonly "logs": readonly X[]}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['logs']>
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
    ): QueryFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: readonly X[]} : 
                {readonly [key in XAlias]: readonly X[]}
        ), 
        TVariables & XVariables & QueryArgs["logs"] & XDirectiveVariables
    >;

    logs<
        XArgs extends AcceptableVariables<QueryArgs['logs']>, 
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
    ): QueryFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: readonly X[]} : 
                {readonly [key in XAlias]: readonly X[]}
        ), 
        TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['logs']> & XDirectiveVariables
    >;


    readonly gasPrice: QueryFetcher<T & {readonly "gasPrice": string}, TVariables>;

    "gasPrice+"<
        XAlias extends string = "gasPrice", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"gasPrice", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): QueryFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~gasPrice": QueryFetcher<Omit<T, 'gasPrice'>, TVariables>;


    readonly maxPriorityFeePerGas: QueryFetcher<T & {readonly "maxPriorityFeePerGas": string}, TVariables>;

    "maxPriorityFeePerGas+"<
        XAlias extends string = "maxPriorityFeePerGas", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"maxPriorityFeePerGas", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): QueryFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~maxPriorityFeePerGas": QueryFetcher<Omit<T, 'maxPriorityFeePerGas'>, TVariables>;


    syncing<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'SyncState', X, XVariables>
    ): QueryFetcher<
        T & {readonly "syncing"?: X}, 
        TVariables & XVariables
    >;

    syncing<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "syncing", 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'SyncState', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"syncing", {}, {}>
        ) => FieldOptions<XAlias, {readonly [key: string]: DirectiveArgs}, XDirectiveVariables>
    ): QueryFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & XDirectiveVariables
    >;


    readonly chainID: QueryFetcher<T & {readonly "chainID": string}, TVariables>;

    "chainID+"<
        XAlias extends string = "chainID", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"chainID", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): QueryFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~chainID": QueryFetcher<Omit<T, 'chainID'>, TVariables>;
}

export const query$: QueryFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "Query", 
            "OBJECT", 
            [], 
            [
                {
                    category: "SCALAR", 
                    name: "block", 
                    argGraphQLTypeMap: {
                        number: 'Long', 
                        hash: 'Bytes32'
                    }, 
                    targetTypeName: "Block", 
                    undefinable: true
                }, 
                {
                    category: "LIST", 
                    name: "blocks", 
                    argGraphQLTypeMap: {
                        from: 'Long', 
                        to: 'Long'
                    }, 
                    targetTypeName: "Block"
                }, 
                {
                    category: "SCALAR", 
                    name: "pending", 
                    targetTypeName: "Pending"
                }, 
                {
                    category: "SCALAR", 
                    name: "transaction", 
                    argGraphQLTypeMap: {hash: 'Bytes32!'}, 
                    targetTypeName: "Transaction", 
                    undefinable: true
                }, 
                {
                    category: "LIST", 
                    name: "logs", 
                    argGraphQLTypeMap: {filter: 'FilterCriteria!'}, 
                    targetTypeName: "Log"
                }, 
                "gasPrice", 
                "maxPriorityFeePerGas", 
                {
                    category: "SCALAR", 
                    name: "syncing", 
                    targetTypeName: "SyncState", 
                    undefinable: true
                }, 
                "chainID"
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export interface QueryArgs {

    readonly block: {
        readonly number?: number, 
        readonly hash?: string
    }, 

    readonly blocks: {
        readonly from?: number, 
        readonly to?: number
    }, 

    readonly transaction: {
        readonly hash: string
    }, 

    readonly logs: {
        readonly filter: FilterCriteria
    }
}
