import { Component } from '@angular/core';
import { Endpoint } from './classes/endpoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Update this once things get hosted
  base_url = 'http://localhost:4200';

  // Documentation populates based on endpoints defined in this array
  endpoints: Endpoint[] = [{
    name: 'Price',
    base_url: this.base_url,
    path: '/api/price',
    params: [
      {param_name: 'from',
      param_desc: 'Currency symbol to convert from. Can be a single symbol or a list of symbols separated by commas',
      required: true,
      example: 'BTC'},
      {param_name: 'to',
      param_desc: 'Currency symbol to convert to. Can be a single symbol or a list of symbols separated by commas',
      required: true,
      example: 'USD'},
      {param_name: 'exch',
      param_desc: 'The exchange to fetch data from (defaults to aggregate of all exchanges)',
      required: false,
      example: null}
    ],
    returns: [
      {return_name: 'price', return_type: 'number', return_desc: 'The price of \'from\' in \'to\' units'},
      {return_name: 'volume24hfrom', return_type: 'number', return_desc: 'The 24 hour volume in \'from\' units'},
      {return_name: 'volume24hto', return_type: 'number', return_desc: 'The 24 hour volume in \'to\' units'},
      {return_name: 'change24h', return_type: 'number', return_desc: 'The 24 hour percent change'}
    ]
  },
  {
    name: 'Coin List',
    base_url: this.base_url,
    path: '/api/coinlist',
    params: [
      {param_name: 'sort',
      // tslint:disable-next-line:max-line-length
      param_desc: 'Sort order for the coinlist. Options are \'cap\' for market cap sorting and \'alpha\' for alphabetical sorting (defaults to \'alpha\')',
      required: false,
      example: 'cap'},
      {param_name: 'n',
      param_desc: 'Number of results to return (defaults to all)',
      required: false,
      example: null}
    ],
    returns: [
      {return_name: 'coinlist', return_type: 'object[]', return_desc: 'An array containing the sorted list of coins'},
    ]
  }
];
}
