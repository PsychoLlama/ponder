// @flow
import { NOTEBOOK_ROOT } from '@ponder/sdk';
import { createReducer } from 'retreon';

import * as actions from '../actions/notebook';
import { notebooks } from './state';

export default createReducer(notebooks, handleAction => [
  handleAction(actions.openRootNotebook, (state, action) => {
    state[NOTEBOOK_ROOT] = {
      title: '',
      contents: action.map(item => ({
        type: item.type,
        id: item.id,
      })),
    };
  }),

  handleAction(actions.createNote, (state, { notebook, id }) => {
    state[notebook].contents.push({ type: 'note', id });
  }),
]);
