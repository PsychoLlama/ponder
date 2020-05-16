// @flow
import { NOTEBOOK_ROOT, Note, Notebook } from '@ponder/sdk';
import { createReducer } from 'retreon';

import * as actions from '../actions/notebook';
import { notebooks } from './state';

export default createReducer(notebooks, handleAction => [
  handleAction(actions.openRootNotebook, (state, entries: any) => {
    state[NOTEBOOK_ROOT] = {
      title: '',
      contents: entries.map((item: Note | Notebook) => ({
        type: item.type,
        id: item.id,
      })),
    };
  }),

  handleAction(actions.createNote, (state, { notebook, id }) => {
    state[notebook].contents.push({ type: 'note', id });
  }),
]);
