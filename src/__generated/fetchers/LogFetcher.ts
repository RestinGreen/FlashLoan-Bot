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
export interface LogFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'Log', T, TVariables> {

    on<XName extends ImplementationType<'Log'>, X extends object, XVariables extends object>(
        child: ObjectFetcher<XName, X, XVariables>, 
        fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
    ): LogFetcher<
        XName extends 'Log' ?
        T & X :
        WithTypeName<T, ImplementationType<'Log'>> & (
            WithTypeName<X, ImplementationType<XName>> | 
            {__typename: Exclude<ImplementationType<'Log'>, ImplementationType<XName>>}
        ), 
        TVariables & XVariables
    >;


    directive(name: string, args?: DirectiveArgs): LogFetcher<T, TVariables>;


    readonly __typename: LogFetcher<T & {__typename: ImplementationType<'Log'>}, TVariables>;


    readonly index: LogFetcher<T & {readonly "index": number}, TVariables>;

    "index+"<
        XAlias extends string = "index", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"index", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): LogFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~index": LogFetcher<Omit<T, 'index'>, TVariables>;


    account<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Account', X, XVariables>
    ): LogFetcher<
        T & {readonly "account": X}, 
        TVariables & XVariables & LogArgs["account"]
    >;

    account<
        XArgs extends AcceptableVariables<LogArgs['account']>, 
        X extends object, 
        XVariables extends object
    >(
        args: XArgs, 
        child: ObjectFetcher<'Account', X, XVariables>
    ): LogFetcher<
        T & {readonly "account": X}, 
        TVariables & XVariables & UnresolvedVariables<XArgs, LogArgs['account']>
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
    ): LogFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & LogArgs["account"] & XDirectiveVariables
    >;

    account<
        XArgs extends AcceptableVariables<LogArgs['account']>, 
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
    ): LogFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & UnresolvedVariables<XArgs, LogArgs['account']> & XDirectiveVariables
    >;


    readonly topics: LogFetcher<T & {readonly "topics": readonly string[]}, TVariables>;

    "topics+"<
        XAlias extends string = "topics", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"topics", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): LogFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: readonly string[]} : 
                {readonly [key in XAlias]: readonly string[]}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~topics": LogFetcher<Omit<T, 'topics'>, TVariables>;


    readonly data: LogFetcher<T & {readonly "data": string}, TVariables>;

    "data+"<
        XAlias extends string = "data", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"data", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): LogFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~data": LogFetcher<Omit<T, 'data'>, TVariables>;


    transaction<
        X extends object, 
        XVariables extends object
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>
    ): LogFetcher<
        T & {readonly "transaction": X}, 
        TVariables & XVariables
    >;

    transaction<
        X extends object, 
        XVariables extends object, 
        XAlias extends string = "transaction", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        child: ObjectFetcher<'Transaction', X, XVariables>, 
        optionsConfigurer: (
            options: FieldOptions<"transaction", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): LogFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: X} : 
                {readonly [key in XAlias]: X}
        ), 
        TVariables & XVariables & XDirectiveVariables
    >;
}

export const log$: LogFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "Log", 
            "EMBEDDED", 
            [], 
            [
                "index", 
                {
                    category: "SCALAR", 
                    name: "account", 
                    argGraphQLTypeMap: {block: 'Long'}, 
                    targetTypeName: "Account"
                }, 
                "topics", 
                "data", 
                {
                    category: "SCALAR", 
                    name: "transaction", 
                    targetTypeName: "Transaction"
                }
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export const log$$ = 
    log$
        .index
        .topics
        .data
;

export interface LogArgs {

    readonly account: {
        readonly block?: number
    }
}
