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
      pairs = await Database.select('pairs.pair_id', 'a.asset_ticker as base', 'b.asset_ticker as quote').from('pairs').innerJoin('assets as a', 'pairs.base_id', 'a.asset_id').innerJoin('assets as b', 'pairs.quote_id', 'b.asset_id').limit(query.limit).orderBy('pair_id')
    }

    else if(!query.limit && query.orderBy) {
      pairs = await Database.select('pairs.pair_id', 'a.asset_ticker as base', 'b.asset_ticker as quote').from('pairs').innerJoin('assets as a', 'pairs.base_id', 'a.asset_id').innerJoin('assets as b', 'pairs.quote_id', 'b.asset_id').orderBy(query.orderBy)
    }
    
    else if(query.limit && query.orderBy){
      pairs = await Database.select('pairs.pair_id', 'a.asset_ticker as base', 'b.asset_ticker as quote').from('pairs').innerJoin('assets as a', 'pairs.base_id', 'a.asset_id').innerJoin('assets as b', 'pairs.quote_id', 'b.asset_id').limit(query.limit).orderBy(query.orderBy)
    }

    else {
      pairs = await Database.select('pairs.pair_id', 'a.asset_ticker as base', 'b.asset_ticker as quote').from('pairs').innerJoin('assets as a', 'pairs.base_id', 'a.asset_id').innerJoin('assets as b', 'pairs.quote_id', 'b.asset_id')
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
