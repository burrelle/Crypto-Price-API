'use strict'

/*
|--------------------------------------------------------------------------
| CoinSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class CoinSeeder {
  async run () {
    const coins = await Factory
      .model('App/Models/Coin')
      .createMany(10)
  }
}

module.exports = CoinSeeder
