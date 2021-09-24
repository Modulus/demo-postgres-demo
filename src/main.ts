
import { QuoteGenerator } from "./quotes.ts"
import { QuoteStorage, Quote  } from "./storage.ts"
import * as log from "https://deno.land/std@0.108.0/log/mod.ts";

import { PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import { sleep } from "https://deno.land/x/sleep/mod.ts";


const DATABASE_URL = Deno.env.get("DATABASE_URL") || 'postgresql://demo:demo@localhost:5432/demo'
log.info("DATABASE_URL = " + DATABASE_URL)



const quoteGenerator = new QuoteGenerator()

let connection = new PostgresConnector({
  uri: DATABASE_URL,
})


await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("INFO"),
  },

  loggers: {
    // configure default logger available via short-hand methods above.
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

const quoteStorage = new QuoteStorage(connection)

try {
  await quoteStorage.initalize()

} catch(e) {
  log.error("Failed to initialize database: "+JSON.stringify(e))
  throw(e)
}

do {
  log.info("Fetching quote")
  const quotes = await quoteGenerator.getQuotes()

  log.info("Data fetched: " + JSON.stringify(quotes))
  try {
    for ( const index in quotes){
      const quote = quotes[index]
      log.info("Saving this quote: " + quote )
      let savedQuote = await quoteStorage.saveQuote(quote)
      log.info("Quote saved: " + JSON.stringify(savedQuote))
    }
  
  
    await sleep(5)
  }
  catch (e){
    console.error("Failed to connect to database")
    throw(e)
  }


}while(true)

  
