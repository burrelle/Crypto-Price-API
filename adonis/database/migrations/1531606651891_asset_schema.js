"use strict";

const Schema = use("Schema");

class AssetSchema extends Schema {
  up() {
    this.create("assets", table => {
      table.increments("asset_id");
      table.text("asset_name");
      table.text("asset_ticker");
      table.text("asset_website");
      table.float("asset_supply");
      table.timestamps();
    });
  }

  down() {
    this.drop("assets");
  }
}

module.exports = AssetSchema;
