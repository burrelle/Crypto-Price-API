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
   * Display a single asset.
   * GET assets/:id
   */
  async show ({ params, request, response, view }) {
    let singleAsset = await Asset.query().where('asset_ticker', params.asset).first();
    return response.json(singleAsset);
  }
}

module.exports = AssetController
