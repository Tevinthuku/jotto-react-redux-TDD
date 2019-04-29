import React from "react";
import { shallow } from "enzyme";
import App, { UnconnectedApp } from "./App";

import { storeFactory } from "./tests/testUtils";

/**
 * @function setup - setup function for the app component
 * @param {object} initialState - redux state object
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<App {...{ store }} />)
    .dive()
    .dive();
};
describe("test redux state", () => {
  test("should have success prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });

  test("should have guessedWords prop", () => {
    const guessedWords = [];
    const wrapper = setup({ guessedWords });

    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });

  test("should have secretWord prop", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });

    const secretWordProp = wrapper.instance().props.secretWord;

    expect(secretWordProp).toBe(secretWord);
  });

  test("should have getSecretWord func prop", () => {
    const wrapper = setup();

    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test("should ensure `getSecretWord` runs on App mount", () => {
  const getSecretWordMock = jest.fn();
  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: []
  };
  // set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  //run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
});
