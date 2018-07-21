import React from "react";
import PropTypes from "prop-types";

const Question = props => {
  Question.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string
  };

  return (
    <div>
      <div className="mt-16 font-semibold text-lg align-left">
        {props.question}
      </div>
      <div className="text-base pt-4 px-32 italic font-light text-center">
        {props.answer}
      </div>
    </div>
  );
};

export default Question;
