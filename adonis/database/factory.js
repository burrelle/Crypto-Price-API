'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/
// const Factory = use('Factory')
// const axios = require('axios')

// async function getNames() {
//   return axios.get('https://min-api.cryptocompare.com/data/all/coinlist').then((res, err) => {
//     const response = res.data.Data
//     var keys = Object.keys(response)

//     let names = []

//     for (let i = 0; i < keys.length; i++) {
//       names.push(res.data.Data[keys[i]].CoinName)
//     }
//     return names;
//   });
// }


// Factory.blueprint('App/Models/Coin', async (faker, i, data) => {
//   let array = await getNames()
//   return {
//     name: array[i]
//   }
// })