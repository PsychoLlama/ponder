// @flow
import { handleActions, type ActionType } from 'redux-actions';
import { NOTEBOOK_ROOT } from '@ponder/sdk';
import { produce } from 'immer';

import * as actions from '../actions/notebook';
import { notebooks, type Notebooks } from './state';

export default handleActions<Notebooks, *>(
  {
    [String(actions.openRootNotebook)]: produce(
      (
        state: Notebooks,
        action: ActionType<typeof actions.openRootNotebook>
      ) => {
        state[NOTEBOOK_ROOT] = {
          title: '',
          contents: action.payload.map((item) => ({
            type: item.type,
            id: item.id,
          })),
        };
      }
    ),

    [String(actions.createNote)]: produce(
      (state: Notebooks, action: ActionType<typeof actions.createNote>) => {
        const notebook = state[action.payload.notebook];
        notebook.contents.push({
          type: 'note',
          id: action.payload.id,
        });
      }
    ),
  },
  notebooks
);
