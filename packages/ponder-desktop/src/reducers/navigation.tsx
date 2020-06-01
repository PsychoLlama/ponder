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

  handleAction(actions.editNote, (state, { id }: any) => {
    state.note = id;
  }),

  handleAction(actions.closeNote, (state) => {
    state.note = null;
  }),

  handleAction(actions.deleteNote, (state, { noteId }) => {
    if (state.note === noteId) {
      state.note = null;
    }
  }),
]);