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
}

module.exports = PairController
