// @flow
import { handleActions, type ActionType } from 'redux-actions';
import produce from 'immer';

import * as actions from '../actions/notebook';
import { navigation, type Navigation } from './state';

export default handleActions(
  {
    [String(actions.openRootNotebook)]: produce((state: Navigation) => {
      state.path = [];
    }),

    [String(actions.createNote)]: produce(
      (state: Navigation, action: ActionType<typeof actions.createNote>) => {
        state.note = action.payload.id;
      }
    ),

    [String(actions.editNote)]: produce(
      (state: Navigation, action: ActionType<typeof actions.editNote>) => {
        state.note = action.payload;
      }
    ),

    [String(actions.closeNote)]: produce((state: Navigation) => {
      state.note = null;
    }),
  },
  navigation
);
