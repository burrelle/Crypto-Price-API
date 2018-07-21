import React from "react";
import PropTypes from "prop-types";

const QuickstartTutorial = props => {
  if (!props.example) {
    return null;
  }

  QuickstartTutorial.propTypes = {
    example: PropTypes.bool,
    tutorial: PropTypes.any.isRequired
  };

  return <div className="px-6 py-4">{props.tutorial}</div>;
};

export default QuickstartTutorial;
