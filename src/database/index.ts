import { isNoResultFoundError } from '@databases/pg-typed'
import { Pool, Client, QueryResult } from 'pg'
import { IToken } from '../address/coin'
import { log } from '../utils/general'

const client = new Client({
  host: 'localhost',
  user: 'bot',
  port: 5432,
  password: '1234',
  database: 'arb_data'
})

client.connect()

/*
-- Table: public.tokens

-- DROP TABLE IF EXISTS public.tokens;

CREATE TABLE IF NOT EXISTS public.tokens
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    symbol text COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    blacklisted boolean DEFAULT false,
    decimals integer,
    CONSTRAINT tokens_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tokens
    OWNER to bot;
*/

//@ts-ignore
export const findSymbolByAddress = async (address: string, callback) => {

  return await client.query(`select * from tokens where address='${address}'`).then(async (result: QueryResult<any>) => {

    // if (!error) {
    var res = await callback(result, '')
    return res
    // } else {
    // callback([], error.message)
    // }
    client.end
  }).catch((error: Error) => {
    return error.message
  })

}

export const insertTokenData = (symbol: string, address: string, decimals: number) => {
  client.query(`insert into tokens (symbol, address, decimals) values ('${symbol}', '${address}', '${decimals}')`, (error: Error) => {

    if (error) {
      log(error.message)
    } else {
      // log(`inserted new token data => ${symbol} | ${address} | ${decimals}`)
    }
    client.end
  })
}

export const selectAll = async (): Promise<IToken[]> => {

  var start = Date.now()
  var res = await client.query(`select * from tokens`)

  let arr: IToken[] = []
  for (let i = 0; i < res.rowCount; i++) {
    let token: IToken = {
      address: res.rows[i]['address'],
      decimals: res.rows[i]['decimals'],
      symbol: res.rows[i]['symbol']
    }
    arr.push(token)
  }
  log(Date.now() - start)

  return arr
}

export const insertProfit = (
  time: string,
  tokenA: string,
  tokenB: string,
  fromDex: string,
  toDex: string,
  tokenAin: string,
  tokenBout: string) => {

  client.query(`insert into found`)
}
