import React, { Component } from "react";

import { connect } from "react-redux";

import { guessWord } from "./actions";

export class UnconnectedInput extends Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
  }

  submitGuessedWord = event => {
    //don't sibmit form
    event.preventDefault();
    const guessedWord = this.inputBox.current.value;
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
    }

    this.inputBox.current.value = "";
  };
  render() {
    const { success } = this.props;
    return (
      <div data-test="component-input">
        {success ? null : (
          <form className="form-inline">
            <input
              data-test="input-box"
              className="mb-2 mx-sm-3"
              id="word-guess"
              ref={this.inputBox}
              placeholder="enter guess"
            />

            <button
              data-test="submit-button"
              type="submit"
              className="btn btn-primary mb-2"
              onClick={this.submitGuessedWord}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

// const mapDispatchToProps = () => {
//   return {
//     guessWord
//   };
// };

export default connect(
  mapStateToProps,
  { guessWord }
)(UnconnectedInput);
