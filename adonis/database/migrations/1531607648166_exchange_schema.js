"use strict";

const Schema = use("Schema");

class ExchangeSchema extends Schema {
  up() {
    this.create("exchanges", table => {
      table.increments("exchange_id");
      table.text("exchange_name").notNullable();
      table.text("countries");
      table.json("urls");
      table.json("markets");
      table.json("symbols");
      table.timestamps();
    });
  }

  down() {
    this.drop("exchanges");
  }
}

module.exports = ExchangeSchema;
