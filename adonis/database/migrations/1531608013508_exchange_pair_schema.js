"use strict";

const Schema = use("Schema");

class ExchangePairSchema extends Schema {
  async up() {
    const exchanges = await this.hasTable("exchanges");
    if (exchanges) {
      this.create("exchange_pairs", table => {
        table.increments("exchange_pair_id").primary();
        table
          .integer("exchange_id")
          .references("exchange_id")
          .inTable("exchanges")
          .onDelete("cascade")
          .notNullable();
        table
          .integer("pair_id")
          .references("pair_id")
          .inTable("pairs")
          .onDelete("cascade")
          .notNullable();
        table
          .json("last_price")
        table.boolean("active").defaultTo(true);
        table.integer("price_precision")
      });
      this.alter("exchange_pairs", table => {
        table.unique(['exchange_id', 'pair_id'])
      });
    }
  }

  down() {
    return this.raw('DROP TABLE exchange_pairs CASCADE');
  }
}

module.exports = ExchangePairSchema;
