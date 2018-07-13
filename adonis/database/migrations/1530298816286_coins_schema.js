'use strict'

const Schema = use('Schema')

class CoinsSchema extends Schema {
  up () {
    this.create('coins', (table) => {
      table.increments()
      table.string('name').unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('coins')
  }
}

module.exports = CoinsSchema
