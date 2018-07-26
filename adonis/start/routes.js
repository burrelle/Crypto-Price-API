"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use("Route");

Route.group(() => {
  // Assets
  Route.get("assets", "AssetController.index");
  Route.get("assets/:asset", "AssetController.show");
  // Exchanges
  Route.get("exchanges", "ExchangeController.index");
  Route.get("exchanges/:exchange", "ExchangeController.show");
  // Pairs
  Route.get("pairs", "PairController.index");
}).prefix("/api");
