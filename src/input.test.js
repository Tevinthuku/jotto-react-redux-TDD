import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "./tests/testUtils";

import Input from "./input";
/**
 * @function setup - func
 * @param {object} initialState - Initial state of component
 * @returns ShallowComponent
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input {...{ store }} />)
    .dive()
    .dive();
};

describe("render", () => {
  describe("word has not been guessed", () => {
    test("should render component without err", () => {});

    test("should render input box", () => {});

    test("should render submit button", () => {});
  });

  describe("word has been guessed", () => {
    test("should render component without err", () => {});

    test("should not render input box", () => {});

    test("should not render submit button", () => {});
  });
});

describe("update state", () => {});
