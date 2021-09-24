import * as log from "https://deno.land/std@0.108.0/log/mod.ts";



class QuoteGenerator {

    private url: string

    constructor(url: string = "http://loremricksum.com/api/?paragraphs=1&quotes=1"){
        this.url = url
    }

    get getUrl() : string {
        return this.url
    }


    async getQuotes() : Promise<string[]> {
        // console.info()
        log.info("Fetching quotes from: "+ this.url)

        let quotes : string[] = []
        await fetch(this.url)
            .then( response => response.json())
            .then(result => { 
                log.debug("Found data: "+ result.data)
                if(Array.isArray(result.data)){
                    result.data.forEach( (quote : string) => {
                        log.debug("Pushing quote " + JSON.stringify(quote)+ " to array")
                        quotes.push(quote)
                    });
                }
                else {
                    const errorMessage = "Data should be an array, data is missing or wrong!"
                    log.error(errorMessage)
                    throw Error(errorMessage)
                }
            })
            .catch(error => {
                log.error("Failed to fetch data from " +this.url + " With error"+ error)
            })
            log.debug("Returning: "+JSON.stringify(quotes))

            return quotes
    }
}


export {
    QuoteGenerator
}