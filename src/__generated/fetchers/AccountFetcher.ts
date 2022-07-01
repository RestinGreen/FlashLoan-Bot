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
export interface AccountFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'Account', T, TVariables> {

    on<XName extends ImplementationType<'Account'>, X extends object, XVariables extends object>(
        child: ObjectFetcher<XName, X, XVariables>, 
        fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
    ): AccountFetcher<
        XName extends 'Account' ?
        T & X :
        WithTypeName<T, ImplementationType<'Account'>> & (
            WithTypeName<X, ImplementationType<XName>> | 
            {__typename: Exclude<ImplementationType<'Account'>, ImplementationType<XName>>}
        ), 
        TVariables & XVariables
    >;


    directive(name: string, args?: DirectiveArgs): AccountFetcher<T, TVariables>;


    readonly __typename: AccountFetcher<T & {__typename: ImplementationType<'Account'>}, TVariables>;


    readonly address: AccountFetcher<T & {readonly "address": string}, TVariables>;

    "address+"<
        XAlias extends string = "address", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"address", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): AccountFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~address": AccountFetcher<Omit<T, 'address'>, TVariables>;


    readonly balance: AccountFetcher<T & {readonly "balance": string}, TVariables>;

    "balance+"<
        XAlias extends string = "balance", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"balance", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): AccountFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~balance": AccountFetcher<Omit<T, 'balance'>, TVariables>;


    readonly transactionCount: AccountFetcher<T & {readonly "transactionCount": number}, TVariables>;

    "transactionCount+"<
        XAlias extends string = "transactionCount", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"transactionCount", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): AccountFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~transactionCount": AccountFetcher<Omit<T, 'transactionCount'>, TVariables>;


    readonly code: AccountFetcher<T & {readonly "code": string}, TVariables>;

    "code+"<
        XAlias extends string = "code", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"code", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): AccountFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~code": AccountFetcher<Omit<T, 'code'>, TVariables>;


    storage(
    ): AccountFetcher<
        T & {readonly "storage": string}, 
        TVariables & AccountArgs["storage"]
    >;

    storage<
        XArgs extends AcceptableVariables<AccountArgs['storage']>
    >(
        args: XArgs
    ): AccountFetcher<
        T & {readonly "storage": string}, 
        TVariables & UnresolvedVariables<XArgs, AccountArgs['storage']>
    >;

    storage<
        XAlias extends string = "storage", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"storage", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): AccountFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & AccountArgs["storage"] & XDirectiveVariables
    >;

    storage<
        XArgs extends AcceptableVariables<AccountArgs['storage']>, 
        XAlias extends string = "storage", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        optionsConfigurer: (
            options: FieldOptions<"storage", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): AccountFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & UnresolvedVariables<XArgs, AccountArgs['storage']> & XDirectiveVariables
    >;
}

export const account$: AccountFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "Account", 
            "EMBEDDED", 
            [], 
            [
                "address", 
                "balance", 
                "transactionCount", 
                "code", 
                {
                    category: "SCALAR", 
                    name: "storage", 
                    argGraphQLTypeMap: {slot: 'Bytes32!'}
                }
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export const account$$ = 
    account$
        .address
        .balance
        .transactionCount
        .code
;

export interface AccountArgs {

    readonly storage: {
        readonly slot: string
    }
}
