import { createReducer } from 'retreon';

import * as actions from '../actions/notebook';
import { navigation } from './state';

export default createReducer(navigation, (handleAction) => [
  handleAction(actions.openRootNotebook, (state) => {
    state.path = [];
  }),

  handleAction(actions.createNote, (state, { id }) => {
    state.note = id;
  }),

  handleAction(actions.editNote, (state, { id }) => {
    state.note = id;
  }),

  handleAction(actions.closeNote, (state) => {
    state.note = null;
  }),

  handleAction.optimistic(actions.deleteNote, (state, { noteId }) => {
    if (state.note === noteId) {
      state.note = null;
    }
  }),
]);
