"use strict";

const Schema = use("Schema");

class PriceSchema extends Schema {
  up() {
    this.create("prices", table => {
      table.increments("price_id");
      table.integer("exchange_pair_id");
      table.float("price");
      table.float("bid");
      table.float("ask");
      table.float("base_volume");
      table.float("quote_volume");
      table.timestamps();
    });
    this.alter("pairs", table => {
      table
        .integer("price_exchchange_pair_fkey")
        .references("exchange_pair_id")
        .inTable("exchange_pairs")
        .onDelete("cascade");
    });
  }

  down() {
    this.drop("prices");
  }
}

module.exports = PriceSchema;
