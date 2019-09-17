// @flow
import type { Notebooks, Navigation, Notes } from '../reducers/state';

export type ReduxState = {
  navigation: Navigation,
  notebooks: Notebooks,
  notes: Notes,
};
