import React from "react";
import PropTypes from "prop-types";

/**
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component {or null if `success` is false}
 */
const congrats = props => {
  return props.success ? (
    <div data-test="component-congrats">
      <span data-test="congrats-message">
        Congratulations! You guessed the word.
      </span>
    </div>
  ) : (
    <div data-test="component-congrats" />
  );
};

congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default congrats;
