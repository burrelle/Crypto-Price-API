import React from "react";
import axios from "axios";
import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
import moment from "moment";
import PropTypes from "prop-types";

ReactChartkick.addAdapter(Chart);

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, date: null };
    this.update = this.update.bind(this);
  }

  reduceData(data) {
    return data.reduce((total, amount) => {
      total.push([amount.ts, amount.price]);
      return total;
    }, []);
  }

  async getPrices() {
    const url =
      "http://ec2-52-40-20-31.us-west-2.compute.amazonaws.com/api/prices/history?exchange=" +
      this.props.exchange +
      "&base=" +
      this.props.base +
      "&quote=" +
      this.props.quote;
    const response = await axios.get(url);
    const data = response.data;
    const prices = this.reduceData(data);
    return prices;
  }

  componentDidMount() {
    if (!this.state.data) {
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
      <div className="mt-32 shadow p-4 rounded">
        <div className="flex justify-between py-4 tracking-wide">
          <div>{this.props.exchange.replace(/^\w/, c => c.toUpperCase())}</div>
          <div>
            {this.props.base.toUpperCase()} - {this.props.quote.toUpperCase()}
          </div>
        </div>
        <LineChart
          data={this.state.data}
          min={null}
          max={null}
          colors={["#794acf", "#794acf"]}
          download={true}
        />
        <div className="flex justify-between items-center py-4 text-sm">
          <div>Last Updated: {this.state.date}</div>
          <div className="flex">
            <span
              className="inline-block bg-purple-dark rounded-full px-3 py-1 text-sm text-white mr-2 hover:bg-white hover:text-purple-dark border-purple-dark border-2"
              onClick={this.update}
            >
              Update
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Charts.propTypes = {
  exchange: PropTypes.string,
  base: PropTypes.string, 
  quote: PropTypes.string
};

export default Charts;
