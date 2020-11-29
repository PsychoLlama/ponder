import { createReducer } from 'retreon';
import { Section, Note, Notebook, EntityType } from '@ponder/sdk';

import * as actions from '../actions/notebook';
import { notes } from './state';

export default createReducer(notes, (handleAction) => [
  handleAction(actions.createNote, (state, { id, title }) => {
    state[id] = { title, sections: [] };
  }),

  handleAction.optimistic(actions.renameNote, (state, { id, title }) => {
    state[id].title = title;
  }),

  handleAction(actions.openRootNotebook, (state, entries) => {
    const notes = entries.filter(
      (entry: Note | Notebook) => entry.type === EntityType.Note
    );

    notes.forEach(({ id, title }: { id: string; title: string }) => {
      state[id] = {
        sections: [],
        title,
      };
    });
  }),

  handleAction(actions.editNote, (state, { id, sections }) => {
    state[id].sections = sections.map((section: Section) => section.id);
  }),

  handleAction.optimistic(actions.deleteNote, (state, { noteId }) => {
    delete state[noteId];
  }),
]);
