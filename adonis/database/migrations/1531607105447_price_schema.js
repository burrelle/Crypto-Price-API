"use strict";

const Schema = use("Schema");

class PriceSchema extends Schema {
  async up() {
    this.create("prices", table => {
      table.bigIncrements("price_id").primary();
      table.integer("exchange_pair_id").notNullable();
      table.float("price").notNullable();
      table.float("bid");
      table.float("ask");
      table.float("basevolume");
      table.float("quotevolume");
      table.integer("ts").notNullable()
    });
    const exchange_pairs = await this.hasTable("exchange_pairs")
    if (exchange_pairs) {
      this.alter("prices", table => {
        table
          .integer("prices_exchchange_pair_fkey")
          .references("exchange_pair_id")
          .inTable("exchange_pairs")
          .onDelete("cascade");
      });
    }
  }

  down() {
    return this.raw('DROP TABLE prices CASCADE');
  }
}

module.exports = PriceSchema;
