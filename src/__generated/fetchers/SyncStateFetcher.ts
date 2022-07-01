import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api';
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
export interface SyncStateFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'SyncState', T, TVariables> {

    on<XName extends ImplementationType<'SyncState'>, X extends object, XVariables extends object>(
        child: ObjectFetcher<XName, X, XVariables>, 
        fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
    ): SyncStateFetcher<
        XName extends 'SyncState' ?
        T & X :
        WithTypeName<T, ImplementationType<'SyncState'>> & (
            WithTypeName<X, ImplementationType<XName>> | 
            {__typename: Exclude<ImplementationType<'SyncState'>, ImplementationType<XName>>}
        ), 
        TVariables & XVariables
    >;


    directive(name: string, args?: DirectiveArgs): SyncStateFetcher<T, TVariables>;


    readonly __typename: SyncStateFetcher<T & {__typename: ImplementationType<'SyncState'>}, TVariables>;


    readonly startingBlock: SyncStateFetcher<T & {readonly "startingBlock": number}, TVariables>;

    "startingBlock+"<
        XAlias extends string = "startingBlock", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"startingBlock", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): SyncStateFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~startingBlock": SyncStateFetcher<Omit<T, 'startingBlock'>, TVariables>;


    readonly currentBlock: SyncStateFetcher<T & {readonly "currentBlock": number}, TVariables>;

    "currentBlock+"<
        XAlias extends string = "currentBlock", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"currentBlock", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): SyncStateFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~currentBlock": SyncStateFetcher<Omit<T, 'currentBlock'>, TVariables>;


    readonly highestBlock: SyncStateFetcher<T & {readonly "highestBlock": number}, TVariables>;

    "highestBlock+"<
        XAlias extends string = "highestBlock", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"highestBlock", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): SyncStateFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~highestBlock": SyncStateFetcher<Omit<T, 'highestBlock'>, TVariables>;
}

export const syncState$: SyncStateFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "SyncState", 
            "EMBEDDED", 
            [], 
            [
                "startingBlock", 
                "currentBlock", 
                "highestBlock"
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export const syncState$$ = 
    syncState$
        .startingBlock
        .currentBlock
        .highestBlock
;
