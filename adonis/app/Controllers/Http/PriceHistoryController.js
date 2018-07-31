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

  /**
   * Render a form to be used for creating a new pricehistory.
   * GET pricehistories/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pricehistory.
   * POST pricehistories
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single pricehistory.
   * GET pricehistories/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pricehistory.
   * GET pricehistories/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pricehistory details.
   * PUT or PATCH pricehistories/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pricehistory with id.
   * DELETE pricehistories/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PriceHistoryController
