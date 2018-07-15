'use strict'

/**
 * Resourceful controller for interacting with prices
 */
class PriceController {
  /**
   * Show a list of all prices.
   * GET prices
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new price.
   * GET prices/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new price.
   * POST prices
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single price.
   * GET prices/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing price.
   * GET prices/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update price details.
   * PUT or PATCH prices/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a price with id.
   * DELETE prices/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PriceController
