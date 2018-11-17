// @flow
import { handleActions, type ActionType } from 'redux-actions';
import produce from 'immer';

import * as actions from '../actions/navigation';

export type State = {
  selectedNoteId: string | null,
};

export const initialState: State = {
  selectedNoteId: null,
};

export default handleActions(
  {
    [String(actions.openNote)](
      state: State,
      action: ActionType<typeof actions.openNote>
    ) {
      return produce(state, draft => {
        draft.selectedNoteId = action.payload;
      });
    },

    [String(actions.closeNote)](state: State) {
      return produce(state, draft => {
        draft.selectedNoteId = null;
      });
    },
  },
  initialState
);
