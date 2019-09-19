// @flow
import type { Notebooks, Navigation, Notes, Sections } from '../reducers/state';

export type ReduxState = {
  navigation: Navigation,
  notebooks: Notebooks,
  notes: Notes,
  sections: Sections,
};
