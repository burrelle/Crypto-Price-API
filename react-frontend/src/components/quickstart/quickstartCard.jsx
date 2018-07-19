import React from "react";
import PropTypes from "prop-types";

class QuickstartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showExample: false };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showExample: !prevState.showExample
    }));
  }

  render() {
    return (
      <div className="mt-32" id={this.props.language}>
        <div className="rounded overflow-hidden shadow-md mb-4">
          <div className="px-6 py-4">
            <div className="font-b old text-xl mb-2 flex items-center">
              <span
                className="inline-block bg-purple-dark rounded-full px-3 py-1 text-lg text-white mr-2 hover:bg-white hover:text-purple-dark border-purple-dark border-2"
                onClick={this.handleToggleClick}
              >
                {this.state.showExample ? "x" : "+"}
              </span>
              <div> {this.props.language} </div>
              <div className="flex items-end text-grey-darker text-sm tracking-wide ml-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QuickstartCard.propTypes = {
  language: PropTypes.string
};

export default QuickstartCard;
