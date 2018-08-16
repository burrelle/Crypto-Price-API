'use strict'

const Database = use('Database')
/**
 * Resourceful controller for interacting with pricehistories
 */
class PriceHistoryController {
  /**
   * Show a list of all pricehistories.
   * GET pricehistories
   */
  async index ({ request, response, view }) {
    const query = request.get();
    let tableName = query.exchange.toLowerCase() + "_" + query.base.toLowerCase() + "_" + query.quote.toLowerCase()

    let prices = await Database.withSchema('prices').select('*').from(tableName)
    return response.json(prices)
  }
}

module.exports = PriceHistoryController
