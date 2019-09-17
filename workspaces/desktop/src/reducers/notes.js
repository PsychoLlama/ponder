// @flow
import { handleActions, type ActionType } from 'redux-actions';
import { produce } from 'immer';

import * as actions from '../actions/notebook';
import { notes, type Notes } from './state';

export default handleActions(
  {
    [String(actions.createNote)]: produce(
      (state: Notes, action: ActionType<typeof actions.createNote>) => {
        const { id, title } = action.payload;

        state[id] = { title, sections: [] };
      }
    ),

    [String(actions.renameNote)]: produce(
      (state: Notes, action: ActionType<typeof actions.renameNote>) => {
        const { id, title } = action.payload;
        state[id].title = title;
      }
    ),
  },
  notes
);
