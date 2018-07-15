'use strict'

/**
 * Resourceful controller for interacting with exchanges
 */
class ExchangeController {
  /**
   * Show a list of all exchanges.
   * GET exchanges
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new exchange.
   * GET exchanges/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new exchange.
   * POST exchanges
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single exchange.
   * GET exchanges/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing exchange.
   * GET exchanges/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update exchange details.
   * PUT or PATCH exchanges/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a exchange with id.
   * DELETE exchanges/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ExchangeController
