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
export interface CallResultFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'CallResult', T, TVariables> {

    on<XName extends ImplementationType<'CallResult'>, X extends object, XVariables extends object>(
        child: ObjectFetcher<XName, X, XVariables>, 
        fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
    ): CallResultFetcher<
        XName extends 'CallResult' ?
        T & X :
        WithTypeName<T, ImplementationType<'CallResult'>> & (
            WithTypeName<X, ImplementationType<XName>> | 
            {__typename: Exclude<ImplementationType<'CallResult'>, ImplementationType<XName>>}
        ), 
        TVariables & XVariables
    >;


    directive(name: string, args?: DirectiveArgs): CallResultFetcher<T, TVariables>;


    readonly __typename: CallResultFetcher<T & {__typename: ImplementationType<'CallResult'>}, TVariables>;


    readonly data: CallResultFetcher<T & {readonly "data": string}, TVariables>;

    "data+"<
        XAlias extends string = "data", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"data", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): CallResultFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~data": CallResultFetcher<Omit<T, 'data'>, TVariables>;


    readonly gasUsed: CallResultFetcher<T & {readonly "gasUsed": number}, TVariables>;

    "gasUsed+"<
        XAlias extends string = "gasUsed", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"gasUsed", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): CallResultFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~gasUsed": CallResultFetcher<Omit<T, 'gasUsed'>, TVariables>;


    readonly status: CallResultFetcher<T & {readonly "status": number}, TVariables>;

    "status+"<
        XAlias extends string = "status", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"status", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): CallResultFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: number} : 
                {readonly [key in XAlias]: number}
        ), 
        TVariables & XDirectiveVariables
    >;

    readonly "~status": CallResultFetcher<Omit<T, 'status'>, TVariables>;
}

export const callResult$: CallResultFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "CallResult", 
            "EMBEDDED", 
            [], 
            [
                "data", 
                "gasUsed", 
                "status"
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export const callResult$$ = 
    callResult$
        .data
        .gasUsed
        .status
;
