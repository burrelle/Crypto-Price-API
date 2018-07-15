'use strict'

/**
 * Resourceful controller for interacting with pairs
 */
class PairController {
  /**
   * Show a list of all pairs.
   * GET pairs
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new pair.
   * GET pairs/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pair.
   * POST pairs
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single pair.
   * GET pairs/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pair.
   * GET pairs/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pair details.
   * PUT or PATCH pairs/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pair with id.
   * DELETE pairs/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PairController
