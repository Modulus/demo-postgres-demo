import { assertEquals, assert, assertExists, assertThrowsAsync} from "https://deno.land/std@0.108.0/testing/asserts.ts";


import { QuoteStorage} from "../src/storage.ts"

import { PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import * as log from "https://deno.land/std@0.108.0/log/mod.ts";

// Deno.test("Verify that error stops program when postgres is not reacheable", async() => {
//     let connector = new PostgresConnector({
//         uri: 'postgresql://demo:demo@neieneidsjasadf:5432/demo',
//       })
//       const quoteStorage = new QuoteStorage(connector)

//       assertThrowsAsync( 
//          async () => {  
//             quoteStorage.initalize()
//         }, Error, "PermissionDenied: Requires net access to 'neieneidsjasadf:5432', run again with the --allow-net flag" 
//     )
// })



Deno.test("Verify that saveQuote works", async () => {
    let connector = new PostgresConnector({
        uri: 'postgresql://demo:demo@localhost:5432/demo',
      })
    const quoteStorage = new QuoteStorage(connector)
    await quoteStorage.initalize(true)

    const quote = "Noo not that!"
    const savedQuote = await quoteStorage.saveQuote(quote)

    assertExists(savedQuote.id)
    assertExists(savedQuote.quote)

    log.info(savedQuote.id)

    let count = await quoteStorage.countQuotes()

    assert(count >= 1)

    let quotes = await quoteStorage.getAll()

    assertEquals(quotes.length, 1)

    await quoteStorage.deleteQuote(savedQuote.id);

    let deletedCount = await quoteStorage.countQuotes()

    assert(deletedCount <= 0)


    quotes = await quoteStorage.getAll()

    assertEquals(quotes.length, 0)
    
});