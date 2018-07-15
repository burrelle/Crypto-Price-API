"use strict";

const Schema = use("Schema");

class ExchangePairSchema extends Schema {
  async up() {
    const exist = await this.hasTable("prices");
    if (exist) {
      this.create("exchange_pairs", table => {
        table.increments("exchange_pair_id");
        table
          .integer("exchange_id")
          .references("exchange_id")
          .inTable("exchanges")
          .onDelete("cascade")
          .unique()
          .notNullable();
        table
          .integer("pair_id")
          .references("pair_id")
          .inTable("pairs")
          .onDelete("cascade")
          .unique()
          .notNullable();
        table
          .integer("last_price")
          .references("price_id")
          .inTable("prices")
          .onDelete("set null");
        table.boolean("active");
        table.json("mkt_precision");
        table.timestamps();
      });
    }
  }

  down() {
    this.drop("exchange_pairs");
  }
}

module.exports = ExchangePairSchema;
