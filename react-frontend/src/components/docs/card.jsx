import React from "react";
import PropTypes from "prop-types";

const Example = props => {
  if (!props.example) {
    return null;
  }

  Example.propTypes = {
    example: PropTypes.bool,
    json: PropTypes.any.isRequired
  };

  return (
    <div className="px-6 py-4">
      <div>
        <pre className="pretty-print lang-json">
          {JSON.stringify(props.json, null, 2)}
        </pre>
      </div>
    </div>
  );
};

class Card extends React.Component {
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
      <div>
        <div className="rounded overflow-hidden shadow-md mb-4">
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2 flex">
              {this.props.verb}
              <div className="flex items-end text-grey-darker text-sm tracking-wide ml-2">
                {this.props.endpoint}
              </div>
            </div>
            <p className="text-grey-darker text-base">
              {this.props.description}
            </p>

            {this.props.additionalInfo != null && 
              <p className="text-xs pt-3">{this.props.additionalInfo}</p>
            }
          </div>
          <div className="px-6 py-4">
            <span
              className="inline-block bg-purple-dark rounded-full px-3 py-1 text-sm text-white mr-2 hover:bg-white hover:text-purple-dark border-purple-dark border-2"
              onClick={this.handleToggleClick}
            >
              {this.state.showExample ? "Hide" : "Sample Response"}
            </span>
            <a href={this.props.liveLink}>
              <span className="inline-block bg-green-dark rounded-full px-3 py-1 text-sm text-white mr-2 hover:bg-white hover:text-green-dark border-green-dark border-2">
                Go Live
              </span>
            </a>
          </div>
          <Example example={this.state.showExample} json={this.props.json} />
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  verb: PropTypes.string,
  endpoint: PropTypes.string,
  description: PropTypes.string,
  json: PropTypes.any.isRequired,
  additionalInfo: PropTypes.any,
  liveLink: PropTypes.string
};

export default Card;
