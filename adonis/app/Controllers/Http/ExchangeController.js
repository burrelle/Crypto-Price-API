'use strict'

const Redis = use('Redis')
const Exchange = use('App/Models/Exchange')
/**
 * Resourceful controller for interacting with exchanges
 */
class ExchangeController {
  /**
   * Show a list of all exchanges.
   * GET exchanges
   */
  async index ({ request, response, view }) {
    const cachedExchanges = await Redis.get('exchanges')
    if(cachedExchanges){
      return JSON.parse(cachedExchanges)
    }

    let exchanges = await Exchange.all();
    await Redis.set('exchanges', JSON.stringify(exchanges))
    return response.json(exchanges);
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
  async show ({ params, response }) {
    let singleExchange = await Exchange.query().where('exchange_name', params.exchange).first();
    return response.json(singleExchange);
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
