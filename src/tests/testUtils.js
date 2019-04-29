import checkPropTypes from "check-prop-types";

import rootReducer from "../reducers";
import { middlewares } from "../configureStore";
import { createStore, applyMiddleware } from "redux";

/**
 * @function storeFactory
 * @param {object} initialState - Initial state for the store
 * @returns {Store} - Redux Store.
 */
export const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

/**
 * This function returns a shallow dom node
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val-  Value of the data-test attribute for search
 * @returns {ShallowWrapper}
 */

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (Component, conformingProps) => {
  const propError = checkPropTypes(
    // eslint-disable-next-line react/forbid-foreign-prop-types
    Component.propTypes,
    conformingProps,
    "prop",
    Component.name
  );

  expect(propError).toBeUndefined();
};
