import { DataTypes, Database, Model, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import * as log from "https://deno.land/std@0.108.0/log/mod.ts";

class Quote extends Model {
    static table = 'quotes';
    static timestamps = true;
  
    static fields = {
      id: { primaryKey: true, autoIncrement: true },
      quote: {
        type: DataTypes.STRING,
        length: 512
      }
    };
  
  }

class QuoteStorage {

    connector: PostgresConnector

    constructor(connector: PostgresConnector){
        this.connector = connector
    }

    async initalize() : Promise<void>{
        const db = new Database(this.connector)
        log.info("Linking with database")
        db.link([Quote]);

        log.info("Syncing")
        await db.sync({ drop: false }); 
        await db.close();

    }

    async saveQuote(quote: string) : Promise<Quote> {
        const db = new Database(this.connector)
        const savedQuote =  await Quote.create({
            quote: quote,
          });  
        await db.close();
        return savedQuote

    }
}

export {
    Quote,
    QuoteStorage
}