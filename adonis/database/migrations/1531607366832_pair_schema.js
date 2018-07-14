"use strict";

const Schema = use("Schema");

class PairSchema extends Schema {
  up() {
    this.create("pairs", table => {
      table.increments("pair_id");
      table.integer("base").unique();
      table.integer("quote").unique();
      table.timestamps();
    });
    this.alter("pairs", table => {
      table
        .integer("pair_asset_fkey1")
        .references("asset_id")
        .inTable("assets")
        .onDelete("cascase");
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
