
import { QuoteGenerator } from "./quotes.ts"
import { QuoteStorage, Quote  } from "./storage.ts"
import * as log from "https://deno.land/std@0.108.0/log/mod.ts";

import { PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import { sleep } from "https://deno.land/x/sleep/mod.ts";


const quoteGenerator = new QuoteGenerator()

let connection = new PostgresConnector({
  database: 'demo',
  host: 'localhost',
  username: 'demo',
  password: 'demo',
  port: 5432, // optional
})
const quoteStorage = new QuoteStorage(connection)
await quoteStorage.initalize()

do {
  log.info("Fetching quote")
  const quotes = await quoteGenerator.getQuotes()

  log.info("Data fetched: " + JSON.stringify(quotes))

  for ( const index in quotes){
    const quote = quotes[index]
    log.info("Saving this quote: " + quote )
    let savedQuote = await quoteStorage.saveQuote(quote)
    log.info("Quote saved: " + JSON.stringify(savedQuote))
  }


  await sleep(5)

}while(true)

  
