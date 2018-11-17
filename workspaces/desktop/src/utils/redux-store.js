// @flow
import { createStore, combineReducers } from 'redux';
import * as reducers from '../reducers';

export default () => {
  const reducer = combineReducers(reducers);

  return createStore(reducer);
};
