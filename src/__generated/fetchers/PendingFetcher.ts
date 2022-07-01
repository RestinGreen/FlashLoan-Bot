import type { AcceptableVariables, UnresolvedVariables, FieldOptions, DirectiveArgs } from 'graphql-ts-client-api';
import { ENUM_INPUT_METADATA } from '../EnumInputMetadata';
import type { ObjectFetcher } from 'graphql-ts-client-api';
import { createFetcher, createFetchableType } from 'graphql-ts-client-api';
import type { WithTypeName, ImplementationType } from '../CommonTypes';
import type {CallData} from '../inputs';

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 * 
 * So any instance of this interface is reuseable.
 */
export interface PendingFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'Pending', T, TVariables> {

    on<XName extends ImplementationType<'Pending'>, X extends object, XVariables extends object>(
        child: ObjectFetcher<XName, X, XVariables>, 
        fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
    ): PendingFetcher<
        XName extends 'Pending' ?
        T & X :
        WithTypeName<T, ImplementationType<'Pending'>> & (
            WithTypeName<X, ImplementationType<XName>> | 
            {__typename: Exclude<ImplementationType<'Pending'>, ImplementationType<XName>>}
        ), 
        TVariables & XVariables
    >;


    directive(name: string, args?: DirectiveArgs): PendingFetcher<T, TVariables>;


    readonly __typename: PendingFetcher<T & {__typename: ImplementationType<'Pending'>}, TVariables>;


    readonly transactionCount: PendingFetcher<T & {readonly "transactionCount": number}, TVariables>;

    "transactionCount+"<
        XAlias extends string = "transactionCount", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"transactionCount", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): PendingFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~transactionCount": PendingFetcher<Omit<T, 'transactionCount'>, TVariables>;


    transactions<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>
    ): PendingFetcher<
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
    ): PendingFetcher<
        T & {readonly [key in XAlias]?: readonly X[]}, 
        TVariables & XVariables & XDirectiveVariables
    >;


    account<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Account', X, XVariables>
    ): PendingFetcher<
        T & {readonly "account": X}, 
        TVariables & XVariables & PendingArgs["account"]
    >;

    account<
        XArgs extends AcceptableVariables<PendingArgs['account']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>
    ): PendingFetcher<
        T & {readonly "account": X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, PendingArgs['account']>
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
    ): PendingFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & PendingArgs["account"] & XDirectiveVariables
    >;

    account<
        XArgs extends AcceptableVariables<PendingArgs['account']>, 
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
    ): PendingFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & UnresolvedVariables<XArgs, PendingArgs['account']> & XDirectiveVariables
    >;


    call<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'CallResult', X, XVariables>
    ): PendingFetcher<
        T & {readonly "call"?: X}, 
        TVariables & XVariables & PendingArgs["call"]
    >;

    call<
        XArgs extends AcceptableVariables<PendingArgs['call']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'CallResult', X, XVariables>
    ): PendingFetcher<
        T & {readonly "call"?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, PendingArgs['call']>
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
    ): PendingFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & PendingArgs["call"] & XDirectiveVariables
    >;

    call<
        XArgs extends AcceptableVariables<PendingArgs['call']>, 
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
    ): PendingFetcher<
        T & {readonly [key in XAlias]?: X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, PendingArgs['call']> & XDirectiveVariables
    >;


    estimateGas(
    ): PendingFetcher<
        T & {readonly "estimateGas": number}, 
        TVariables & PendingArgs["estimateGas"]
    >;

    estimateGas<
        XArgs extends AcceptableVariables<PendingArgs['estimateGas']>
    >(
        args: XArgs
    ): PendingFetcher<
        T & {readonly "estimateGas": number}, 
        TVariables & UnresolvedVariables<XArgs, PendingArgs['estimateGas']>
    >;

    estimateGas<
        XAlias extends string = "estimateGas", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"estimateGas", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): PendingFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & PendingArgs["estimateGas"] & XDirectiveVariables
    >;

    estimateGas<
        XArgs extends AcceptableVariables<PendingArgs['estimateGas']>, 
        XAlias extends string = "estimateGas", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        optionsConfigurer: (
            options: FieldOptions<"estimateGas", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): PendingFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & UnresolvedVariables<XArgs, PendingArgs['estimateGas']> & XDirectiveVariables
    >;
}

export const pending$: PendingFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "Pending", 
            "EMBEDDED", 
            [], 
            [
                "transactionCount", 
                {
                    category: "LIST", 
                    name: "transactions", 
                    targetTypeName: "Transaction", 
                    undefinable: true
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

export const pending$$ = 
    pending$
        .transactionCount
;

export interface PendingArgs {

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
