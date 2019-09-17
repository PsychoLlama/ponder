// @flow
import { handleActions, type ActionType } from 'redux-actions';
import { NOTEBOOK_ROOT } from '@ponder/sdk';
import { produce } from 'immer';

import * as actions from '../actions/notebook';
import { notebooks, type Notebooks } from './state';

export default handleActions(
  {
    [String(actions.openRootNotebook)]: produce(
      (
        state: Notebooks,
        action: ActionType<typeof actions.openRootNotebook>
      ) => {
        const notebooks = {};
        const notes = {};

        action.payload.forEach(item => {
          const map = item.type === 'note' ? notes : notebooks;

          map[item.id] = item.title;
        });

        state[NOTEBOOK_ROOT] = {
          notebooks,
          notes,
        };
      }
    ),
  },
  notebooks
);
