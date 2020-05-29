import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import reduxPromise from 'redux-promise';
import { middleware } from 'retreon';

import { openRootNotebook } from '../actions/notebook';

import * as reducers from '../reducers';

export const DEVTOOLS_KEY = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    [DEVTOOLS_KEY]?: typeof compose;
  }
}

export default async () => {
  const composeEnhancers = window[DEVTOOLS_KEY] || compose;

  const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(middleware, reduxPromise))
  );

  await store.dispatch(openRootNotebook());

  return store;
};
