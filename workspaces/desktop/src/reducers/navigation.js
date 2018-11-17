// @flow
import { handleActions, type ActionType } from 'redux-actions';
import produce from 'immer';

import * as actions from '../actions/navigation';

export type Navigation = {
  selectedNoteId: string | null,
};

export const initialState: Navigation = {
  selectedNoteId: null,
};

export default handleActions(
  {
    [String(actions.openNote)](
      state: Navigation,
      action: ActionType<typeof actions.openNote>
    ) {
      return produce(state, draft => {
        draft.selectedNoteId = action.payload;
      });
    },

    [String(actions.closeNote)](state: Navigation) {
      return produce(state, draft => {
        draft.selectedNoteId = null;
      });
    },
  },
  initialState
);
