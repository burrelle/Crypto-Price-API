import React from 'react';
import PropTypes from 'prop-types';
import Python from '../utils/pythontutorial.jsx';


const Example = props => {
    if (!props.show) {
        return null;
    }

    Example.propTypes = {
        example: PropTypes.bool,
        tutorial: PropTypes.any.isRequired
    };

    return (
        <div className= "px-6 py-4">
            {props.tutorial}
        </div>
    );
};

/*
class TutorialCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showTutorial: false};
        this.handleResponseClick = this.handleResponseClick.bind(this);
    }

    handleResponseClick() {
        this.setState(prevState => ({
            showTutorial: !prevState.showTutorial
        }));
    }

    render() {
        return (
            <div>
                <div className="rounded overflow-hidden shadow-md mb-4">
                    <span className="inline-block bg-purple-dark rounded-full px-3 py-1 text-sm text-white mr-2 hover:bg-white hover:text-purple-dark border-purple-dark border-2" onClick={this.handleResponseClick}>
                        {this.state.showTutorial ? "Hide": "Show Python Tutorial"}
                    </span>
                </div>
                <Example show={this.state.showTutorial} tutorial={ this.props.tutorial } />
            </div>
        )
    }
}
*/


class TutorialCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showTutorial: false};
        this.handleResponseClick = this.handleResponseClick.bind(this);
    }

    handleResponseClick() {
        this.setState(prevState => ({
            showTutorial: !prevState.showTutorial
        }));
    }

    render() {
        return (
            <div>
                <span className="block group hover:bg-blue p-4 border-b" onClick={this.handleResponseClick}>
                    {this.state.showTutorial ? "Hide": this.props.text }
                </span>
                <Example show={this.state.showTutorial} tutorial={ this.props.tutorial } />
            </div>
        )
    }
}

export default TutorialCards;