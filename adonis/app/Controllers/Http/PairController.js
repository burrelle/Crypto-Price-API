'use strict'

const Database = use('Database')

/**
 * Resourceful controller for interacting with pairs
 */
class PairController {
  /**
   * Show a list of all pairs.
   * GET pairs
   * Query parameters = limit, orderBy
   */
  async index ({ request, response, view }) {
    const query = request.get();
    let pairs;

    if(query.limit && !query.orderBy) {
      pairs = await Database.select('pair_id', 'base', 'quote', 'exchanges').from('pairs').limit(query.limit).orderBy('pair_id')
    }

    else if(!query.limit && query.orderBy) {
      pairs = await Database.select('pair_id', 'base', 'quote', 'exchanges').from('pairs').orderBy(query.orderBy)
    }
    
    else if(query.limit && query.orderBy){
      pairs = await Database.select('pair_id', 'base', 'quote', 'exchanges').from('pairs').limit(query.limit).orderBy(query.orderBy)
    }

    else {
      pairs = await Database.select('pair_id', 'base', 'quote', 'exchanges').from('pairs')
    }
    return response.json(pairs);
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
  async show ({ request, response }) {
    const query = request.get();
    let singlePair = await Database.select('pair_id', 'base', 'quote', 'exchanges').from('pairs').where({
      base: query.base.toUpperCase(),
      quote: query.quote.toUpperCase()
    })
    return response.json(singlePair);
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
