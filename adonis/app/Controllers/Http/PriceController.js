'use strict'

const Redis = use('Redis')
const Database = use('Database')
/**
 * Resourceful controller for interacting with prices
 */
class PriceController {
  /**
   * Show a list of all prices.
   * GET prices
   */
  async index({request, response, view }) {
    const cachedPrices = await Redis.get('prices')
    if(cachedPrices){
      return JSON.parse(cachedPrices)
    }

    let prices = await Database.select('exchange_pair_id', 'exchange_name', 'a.asset_ticker as base', 'b.asset_ticker as quote', 'last_price', 'active', 'price_precision')
      .from('exchange_pairs')
      .innerJoin('exchanges as e', 'exchange_pairs.exchange_id', 'e.exchange_id')
      .innerJoin('pairs', 'exchange_pairs.pair_id', 'pairs.pair_id')
      .innerJoin('assets as a', 'pairs.base_id', 'a.asset_id')
      .innerJoin('assets as b', 'pairs.quote_id', 'b.asset_id')
      await Redis.set('prices', JSON.stringify(prices))
      return response.json(prices);
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
    const query = request.get();
    let price = await Database.select('exchange_pair_id', 'exchange_name', 'a.asset_ticker as base', 'b.asset_ticker as quote', 'last_price', 'active', 'price_precision')
      .from('exchange_pairs')
      .innerJoin('exchanges as e', 'exchange_pairs.exchange_id', 'e.exchange_id')
      .innerJoin('pairs', 'exchange_pairs.pair_id', 'pairs.pair_id')
      .innerJoin('assets as a', 'pairs.base_id', 'a.asset_id')
      .innerJoin('assets as b', 'pairs.quote_id', 'b.asset_id')
      .where('exchange_name', query.exchange.replace(/^\w/, c => c.toUpperCase()))
      .where('a.asset_ticker', query.base.toUpperCase())
      .where('b.asset_ticker', query.quote.toUpperCase())
      return response.json(price);
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
