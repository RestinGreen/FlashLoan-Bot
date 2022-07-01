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
export interface AccessTupleFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'AccessTuple', T, TVariables> {

    on<XName extends ImplementationType<'AccessTuple'>, X extends object, XVariables extends object>(
        child: ObjectFetcher<XName, X, XVariables>, 
        fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
    ): AccessTupleFetcher<
        XName extends 'AccessTuple' ?
        T & X :
        WithTypeName<T, ImplementationType<'AccessTuple'>> & (
            WithTypeName<X, ImplementationType<XName>> | 
            {__typename: Exclude<ImplementationType<'AccessTuple'>, ImplementationType<XName>>}
        ), 
        TVariables & XVariables
    >;


    directive(name: string, args?: DirectiveArgs): AccessTupleFetcher<T, TVariables>;


    readonly __typename: AccessTupleFetcher<T & {__typename: ImplementationType<'AccessTuple'>}, TVariables>;


    readonly address: AccessTupleFetcher<T & {readonly "address": string}, TVariables>;

    "address+"<
        XAlias extends string = "address", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"address", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): AccessTupleFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~address": AccessTupleFetcher<Omit<T, 'address'>, TVariables>;


    readonly storageKeys: AccessTupleFetcher<T & {readonly "storageKeys": readonly string[]}, TVariables>;

    "storageKeys+"<
        XAlias extends string = "storageKeys", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"storageKeys", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): AccessTupleFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: readonly string[]} : 
                {readonly [key in XAlias]: readonly string[]}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~storageKeys": AccessTupleFetcher<Omit<T, 'storageKeys'>, TVariables>;
}

export const accessTuple$: AccessTupleFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "AccessTuple", 
            "EMBEDDED", 
            [], 
            [
                "address", 
                "storageKeys"
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export const accessTuple$$ = 
    accessTuple$
        .address
        .storageKeys
;
