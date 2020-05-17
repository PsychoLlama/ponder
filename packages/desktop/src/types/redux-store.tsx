import type { Notebooks, Navigation, Notes, Sections } from '../reducers/state';

export interface ReduxState {
  navigation: Navigation;
  notebooks: Notebooks;
  notes: Notes;
  sections: Sections;
}
