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
   * Display a single exchange.
   * GET exchanges/:id
   */
  async show ({ params, response }) {
    let singleExchange = await Exchange.query().where('exchange_name', params.exchange).first();
    return response.json(singleExchange);
  }
}

module.exports = ExchangeController
