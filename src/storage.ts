import { DataTypes, Database, Model, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import * as log from "https://deno.land/std@0.108.0/log/mod.ts";

class Quote extends Model {
    static table = 'quotes';
    static timestamps = true;
  
    static fields = {
      id: { primaryKey: true, autoIncrement: true },
      quote: {
        type: DataTypes.STRING,
        length: 1024
      }
    };
  
  }

class QuoteStorage {

    connector: PostgresConnector

    constructor(connector: PostgresConnector){
        this.connector = connector
    }

    async initalize(drop: boolean = false) : Promise<void>{
        log.info("Initializing database")
        const db = new Database(this.connector)
        log.debug("Linking with database")
        db.link([Quote]);

        log.debug("Syncing")
        await db.sync({ drop: drop }); 
        await db.close();

    }

    async saveQuote(quote: string) : Promise<Quote> {
        log.debug("Saving quote")
        log.debug("Connection to database")

        const db = new Database(this.connector)
        const savedQuote =  await Quote.create({
            quote: quote,
          });  

        await db.close();
        log.debug("Connection closed!")

        return savedQuote

    }

    async getQuote(id: string){
        log.debug("Fetching quote")
        log.debug("Connection to database")

        const db = new Database(this.connector)
        const savedQuote =  await Quote.select("id", "quote").where("id", id);  

        await db.close();
        log.debug("Connection closed!")

        return savedQuote
    }

    async deleteQuote(id : any){
        log.debug("Deleting quote")
        log.debug("Connection to database")

        const db = new Database(this.connector)
        const deletedStuff =  await Quote.deleteById(id)
        log.debug("Connection closed!")

        return deletedStuff
    }

    async countQuotes() : Promise<number> {
        log.debug("Counting quotes")
        log.debug("Connection to database")
        const db = new Database(this.connector)
        const count =  await Quote.count()

        await db.close()
        log.debug("Connection closed!")


        return count
    }

    async getAll() : Promise<Quote[]> {
        log.debug("Counting quotes")
        log.debug("Connection to database")

        const db = new Database(this.connector)
        const quotes =  await Quote.all()

        await db.close()
        log.debug("Connection closed!")

        return quotes
    }
}

export {
    Quote,
    QuoteStorage
}