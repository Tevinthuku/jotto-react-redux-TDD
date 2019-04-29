import React from "react";
import { connect } from "react-redux";

import "./App.css";

import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import Input from "./input";
import { getSecretWord } from "./actions";

export class UnconnectedApp extends React.Component {
  state = {};
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }
  render() {
    const { success, guessedWords } = this.props;
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Input />
        <Congrats {...{ success }} />
        <GuessedWords {...{ guessedWords }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { success, guessedWords, secretWord } = state;

  return { success, guessedWords, secretWord };
};

export default connect(
  mapStateToProps,
  { getSecretWord }
)(UnconnectedApp);
