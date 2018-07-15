"use strict";

const Schema = use("Schema");

class AssetSchema extends Schema {
  up() {
    this.create("assets", table => {
      table.increments("asset_id").primary();
      table.text("asset_name").unique();
      table.text("asset_ticker").notNullable().unique();
      table.text("asset_website");
      table.float("asset_supply");
    });
  }
  down() {
    return this.raw('DROP TABLE assets CASCADE');
  }
}

module.exports = AssetSchema;
