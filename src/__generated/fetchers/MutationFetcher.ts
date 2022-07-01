import type { AcceptableVariables, UnresolvedVariables, FieldOptions, DirectiveArgs } from 'graphql-ts-client-api';
import { ENUM_INPUT_METADATA } from '../EnumInputMetadata';
import type { ObjectFetcher } from 'graphql-ts-client-api';
import { createFetcher, createFetchableType } from 'graphql-ts-client-api';

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 * 
 * So any instance of this interface is reuseable.
 */
export interface MutationFetcher<T extends object, TVariables extends object> extends ObjectFetcher<'Mutation', T, TVariables> {


    directive(name: string, args?: DirectiveArgs): MutationFetcher<T, TVariables>;


    sendRawTransaction(
    ): MutationFetcher<
        T & {readonly "sendRawTransaction": string}, 
        TVariables & MutationArgs["sendRawTransaction"]
    >;

    sendRawTransaction<
        XArgs extends AcceptableVariables<MutationArgs['sendRawTransaction']>
    >(
        args: XArgs
    ): MutationFetcher<
        T & {readonly "sendRawTransaction": string}, 
        TVariables & UnresolvedVariables<XArgs, MutationArgs['sendRawTransaction']>
    >;

    sendRawTransaction<
        XAlias extends string = "sendRawTransaction", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        optionsConfigurer: (
            options: FieldOptions<"sendRawTransaction", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): MutationFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & MutationArgs["sendRawTransaction"] & XDirectiveVariables
    >;

    sendRawTransaction<
        XArgs extends AcceptableVariables<MutationArgs['sendRawTransaction']>, 
        XAlias extends string = "sendRawTransaction", 
        XDirectives extends { readonly [key: string]: DirectiveArgs } = {}, 
        XDirectiveVariables extends object = {}
    >(
        args: XArgs, 
        optionsConfigurer: (
            options: FieldOptions<"sendRawTransaction", {}, {}>
        ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
    ): MutationFetcher<
        T & (
            XDirectives extends { readonly include: any } | { readonly skip: any } ? 
                {readonly [key in XAlias]?: string} : 
                {readonly [key in XAlias]: string}
        ), 
        TVariables & UnresolvedVariables<XArgs, MutationArgs['sendRawTransaction']> & XDirectiveVariables
    >;
}

export const mutation$: MutationFetcher<{}, {}> = 
    createFetcher(
        createFetchableType(
            "Mutation", 
            "EMBEDDED", 
            [], 
            [
                {
                    category: "SCALAR", 
                    name: "sendRawTransaction", 
                    argGraphQLTypeMap: {data: 'Bytes!'}
                }
            ]
        ), 
        ENUM_INPUT_METADATA, 
        undefined
    )
;

export interface MutationArgs {

    readonly sendRawTransaction: {
        readonly data: string
    }
}
