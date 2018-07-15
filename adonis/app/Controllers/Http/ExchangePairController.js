'use strict'

/**
 * Resourceful controller for interacting with exchangepairs
 */
class ExchangePairController {
  /**
   * Show a list of all exchangepairs.
   * GET exchangepairs
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new exchangepair.
   * GET exchangepairs/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new exchangepair.
   * POST exchangepairs
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single exchangepair.
   * GET exchangepairs/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing exchangepair.
   * GET exchangepairs/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update exchangepair details.
   * PUT or PATCH exchangepairs/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a exchangepair with id.
   * DELETE exchangepairs/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ExchangePairController
