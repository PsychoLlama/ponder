// @flow
import type { State as Navigation } from '../reducers/navigation';
import type { State as Notebooks } from '../reducers/notebooks';

export type ReduxState = {
  navigation: Navigation,
  notebooks: Notebooks,
};
