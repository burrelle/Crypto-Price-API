'use strict'

const Coin = use('App/Models/Coin')

/**
 * Resourceful controller for interacting with coins
 */
class CoinController {
  /**
   * Show a list of all coins.
   * GET coins
   */
  async index ({response}) {
    let coins = await Coin.all();
    return response.json(coins);
  }

  /**
   * Render a form to be used for creating a new coin.
   * GET coins/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new coin.
   * POST coins
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single coin.
   * GET coins/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing coin.
   * GET coins/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update coin details.
   * PUT or PATCH coins/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a coin with id.
   * DELETE coins/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CoinController
