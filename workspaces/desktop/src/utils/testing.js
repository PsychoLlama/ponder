// @flow
import { initialState as notebooks } from '../reducers/notebooks';
import type { ReduxState } from '../types/redux-store';

export const createReduxState = (): ReduxState => ({
  notebooks,
});
