import React from 'react'
import PropTypes from "prop-types";

export const Example = props => {
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

export default Example;
