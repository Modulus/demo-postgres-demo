import * as log from "https://deno.land/std@0.108.0/log/mod.ts";



class Quotes {

    private url: string

    constructor(url: string = "http://loremricksum.com/api/?paragraphs=1&quotes=1"){
        this.url = url
    }

    get getUrl() : string {
        return this.url
    }


    async getQuotes() : Promise<string[]> {
        // console.info()
        log.info("Fetching quotes")

        let quotes : string[] = []
        await fetch(this.url)
            .then( response => response.json())
            .then(result => { 
                log.info("Found data: "+ result.data)
                log.info(typeof(result.data[0]))
                if(Array.isArray(result.data)){
                    result.data.forEach( (quote : string) => {
                        quotes.push(quote)
                    });
                }
                else {
                    throw Error("Data should be an array, data is missing or wrong!")
                }
            })
            .catch(error => {
                log.error("Failed to fetch data from " +this.url + "With error"+ error)
            })
            return quotes
    }
}


export {
    Quotes
}