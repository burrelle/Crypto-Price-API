import React from "react";
import axios from "axios";
import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
import moment from "moment";

const url =
  "http://localhost:3333/api/prices/history?exchange=binance&base=btc&quote=usdt";
ReactChartkick.addAdapter(Chart);
const exchange = "binance";
const base = "btc";
const quote = "usdt";

class Charts extends React.Component {
  constructor() {
    super();
    this.state = { data: null, date: null, exchanges: null };
    this.update = this.update.bind(this);
  }

  async getPrices() {
    const response = await axios.get(url);
    const data = response.data;
    const prices = data.reduce((total, amount) => {
      total.push([amount.ts, amount.price]);
      return total;
    }, []);
    return prices;
  }

  async getExchanges() {
    const response = await axios.get("http://localhost:3333/api/exchanges");
    const data = response.data;
    const exchanges = data.reduce((total, amount) => {
      total.push(amount.exchange_name);
      return total;
    }, []);
    return exchanges;
  }

  componentDidMount() {
    if (!this.state.data) {
      (async () => {
        try {
          this.setState({
            data: await this.getPrices(),
            exchanges: await this.getExchanges()
          });
        } catch (e) {
          console.log(e);
        }
      })();
    }
    this.setState({ date: moment().format("MMMM Do YYYY, h:mm:ss a") });
  }

  update() {
    if (this.state.data) {
      (async () => {
        try {
          this.setState({
            data: await this.getPrices()
          });
        } catch (e) {
          console.log(e);
        }
      })();
    }
    this.setState({ date: moment().format("MMMM Do YYYY, h:mm:ss a") });
  }

  render() {
    return (
      <div className="mt-32">
        <div className="flex justify-between py-4 tracking-wide">
          <div>{exchange.replace(/^\w/, c => c.toUpperCase())}</div>
          <div>
            {base.toUpperCase()} - {quote.toUpperCase()}
          </div>
        </div>
        <LineChart
          data={this.state.data}
          min={null}
          max={null}
          colors={["#794acf", "#794acf"]}
        />
        <div className="flex justify-between items-center py-4 text-sm">
          <div>
            <span
              className="inline-block bg-purple-dark rounded-full px-3 py-1 text-sm text-white mr-2 hover:bg-white hover:text-purple-dark border-purple-dark border-2"
              onClick={this.update}
            >
              Update
            </span>
            Last Updated: {this.state.date}
          </div>
          <div className="inline-block relative">
            <select className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-1 pr-8 rounded leading-tight">
              {this.state.exchanges ? (
                this.state.exchanges.map((item, i) => (
                  <option key={i} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
            </select>
            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
