import { assertEquals, assert } from "https://deno.land/std@0.108.0/testing/asserts.ts";

import { Quotes } from "../src/quotes.ts"

Deno.test("Check empty Quotes constructor sets correct url", () => {
    const quotes = new Quotes()
    assertEquals(quotes.getUrl, "http://loremricksum.com/api/?paragraphs=1&quotes=1");
});

Deno.test("Verify that getQuote returns an array of quotes", async () => {
    const quotes = new Quotes()
    const result = await quotes.getQuotes()

    assert(Array.isArray(result))
    assert(result.length == 1)
    assert(result[0].length > 2)
});