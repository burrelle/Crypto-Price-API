'use strict'

const Redis = use('Redis')
const Asset = use('App/Models/Asset')
const Database = use('Database')
/**
 * Resourceful controller for interacting with assets
 */
class AssetController {
  /**
   * Show a list of all assets.
   * GET assets
   */
  async index ({ request, response }) {
    const query = request.get();
    
    if(query.orderByTotalSupply){
      let assets = await Database.select('*').from('assets').orderBy('asset_total_supply')
      return response.json(assets);
    }
    
    const cachedAssets = await Redis.get('assets')
    if(cachedAssets){
      return JSON.parse(cachedAssets)
    }

    let assets = await Asset.all();
    await Redis.set('assets', JSON.stringify(assets))
    return response.json(assets);
  }

  /**
   * Render a form to be used for creating a new asset.
   * GET assets/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new asset.
   * POST assets
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single asset.
   * GET assets/:id
   */
  async show ({ params, request, response, view }) {
    let singleAsset = await Asset.query().where('asset_ticker', params.asset).first();
    return response.json(singleAsset);
  }

  /**
   * Render a form to update an existing asset.
   * GET assets/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update asset details.
   * PUT or PATCH assets/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a asset with id.
   * DELETE assets/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AssetController
