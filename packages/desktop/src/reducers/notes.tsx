// @flow
import { createReducer } from 'retreon';

import * as actions from '../actions/notebook';
import { notes } from './state';

export default createReducer(notes, handleAction => [
  handleAction(actions.createNote, (state, { id, title }) => {
    state[id] = { title, sections: [] };
  }),

  handleAction(actions.renameNote, (state, { id, title }) => {
    state[id].title = title;
  }),

  handleAction(actions.openRootNotebook, (state, entries) => {
    const notes = entries.filter(entry => entry.type === 'note');

    notes.forEach(({ id, title }) => {
      state[id] = {
        sections: [],
        title,
      };
    });
  }),

  handleAction(actions.editNote, (state, { id, sections }) => {
    state[id].sections = sections.map(section => section.id);
  }),
]);
