"use strict";

const Schema = use("Schema");

class PairSchema extends Schema {
  up() {
    this.create("pairs", table => {
      table.increments("pair_id");
      table.integer("base_id").unique().notNullable();
      table.integer("quote_id").unique().notNullable();
    });
    this.alter("pairs", table => {
      table
        .integer("pair_asset_fkey1")
        .references("asset_id")
        .inTable("assets")
        .onDelete("cascade");
      table
        .integer("pair_asset_fkey2")
        .references("asset_id")
        .inTable("assets")
        .onDelete("cascade");
    });
  }

  down() {
    this.drop("pairs");
  }
}

module.exports = PairSchema;
