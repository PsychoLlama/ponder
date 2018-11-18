// @flow
import { createStore, combineReducers } from 'redux';
import * as reducers from '../reducers';

export const DEVTOOLS_KEY = '__REDUX_DEVTOOLS_EXTENSION__';

export default () => {
  const reducer = combineReducers(reducers);
  const middleware =
    typeof window[DEVTOOLS_KEY] === 'function'
      ? window[DEVTOOLS_KEY]()
      : undefined;

  return createStore(reducer, middleware);
};
