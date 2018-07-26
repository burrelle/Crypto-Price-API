"use strict";

const Schema = use("Schema");

class ExchangeSchema extends Schema {
  up() {
    this.create("exchanges", table => {
      table.increments("exchange_id").primary();
      table.text("exchange_name").notNullable().unique();
      table.specificType("countries", "text[]");
      table.text("exchange_url");
    });
  }

  down() {
    return this.raw('DROP TABLE exchanges CASCADE');
  }
}

module.exports = ExchangeSchema;
