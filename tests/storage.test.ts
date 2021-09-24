import { assertEquals, assert, assertExists} from "https://deno.land/std@0.108.0/testing/asserts.ts";


import { QuoteStorage, Quote} from "../src/storage.ts"

import { DataTypes, Database, Model, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import * as log from "https://deno.land/std@0.108.0/log/mod.ts";


Deno.test("Verify that saveQuote works", async () => {
    let connector = new PostgresConnector({
        uri: 'postgresql://demo:demo@localhost:5432/demo',
      })
    const quoteStorage = new QuoteStorage(connector)
    await quoteStorage.initalize()

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