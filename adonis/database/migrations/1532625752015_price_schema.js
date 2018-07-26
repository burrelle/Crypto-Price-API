'use strict'

const Schema = use('Schema')

class PriceSchema extends Schema {
  up () {
    this.raw('CREATE SCHEMA prices');
  }

  down () {
    return this.raw('DROP SCHEMA IF EXISTS prices CASCADE;');
  }
}

module.exports = PriceSchema
