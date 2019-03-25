// @flow
import reduxPromise from 'redux-promise';
import {
  compose,
  type Store,
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

import { openRootNotebook } from '../actions/navigation';

import type { ReduxState } from '../types/redux-store';
import * as reducers from '../reducers';

export const DEVTOOLS_KEY = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

export default async () => {
  const composeEnhancers =
    typeof window[DEVTOOLS_KEY] === 'function' ? window[DEVTOOLS_KEY] : compose;

  const store: Store<ReduxState, *, *> = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(reduxPromise))
  );

  await store.dispatch(openRootNotebook());

  return store;
};
