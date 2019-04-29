import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "./tests/testUtils";

import Input, { UnconnectedInput } from "./input";
/**
 * @function setup - func
 * @param {object} initialState - Initial state of component
 * @returns ShallowComponent
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<Input {...{ store }} />)
    .dive()
    .dive();
};

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;

    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test("should render component without err", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });

    test("should render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });

    test("should render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });

  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test("should render component without err", () => {
      const component = findByTestAttr(wrapper, "component-input");

      expect(component.length).toBe(1);
    });

    test("should not render input box", () => {
      const inputComponent = findByTestAttr(wrapper, "input-box");
      expect(inputComponent.length).toBe(0);
    });

    test("should not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("update state", () => {});

describe("redux props", () => {
  test("should return success piece of state", () => {
    const success = true;
    const wrapper = setup({ success });

    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });

  test("should have `guessWord` action creator as a funtion prop", () => {
    const wrapper = setup();

    const guessWordProp = wrapper.instance().props.guessWord;

    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("`guessWord` action creator call", () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = "train";
  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
      success: false
    };

    wrapper = shallow(<UnconnectedInput {...props} />);
    // add value to input box
    wrapper.instance().inputBox.current = { value: guessedWord };
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault: () => {} });
  });
  test("should run `guessWord` on clicking submit", () => {
    const guessWordCalls = guessWordMock.mock.calls.length;
    expect(guessWordCalls).toBe(1);
  });

  test("should call `guessWordwith input value as argument`", () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });

  test("should clear input box on submit", () => {
    expect(wrapper.instance().inputBox.current.value).toBe("");
  });
});
