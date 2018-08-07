"use strict";

const Schema = use("Schema");

class PairSchema extends Schema {
  async up() {
    this.create("pairs", table => {
      table.increments("pair_id").primary();
      table.integer("base_id").notNullable();
      table.integer("quote_id").notNullable();
      table.text('base');
      table.text('quote');
      table.specificType('exchanges', 'text[]')
    });
    const assets = await this.hasTable('assets')
    if (assets) {
      this.alter("pairs", table => {
        table
          .integer("pairs_asset_fkey1")
          .references("asset_id")
          .inTable("assets")
          .onDelete("cascade");
        table
          .integer("pairs_asset_fkey2")
          .references("asset_id")
          .inTable("assets")
          .onDelete("cascade");
        table.unique(['base_id', 'quote_id'])
      });
    }
  }

  down() {
    return this.raw('DROP TABLE pairs CASCADE');
  }
}

module.exports = PairSchema;
