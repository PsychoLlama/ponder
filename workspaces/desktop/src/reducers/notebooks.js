// @flow
import { handleActions, type ActionType } from 'redux-actions';
import produce from 'immer';

import * as actions from '../actions/notebooks';

export type State = {
  selectedNoteId: string | null,
};

export const initialState: State = {
  selectedNoteId: null,
};

export default handleActions(
  {
    [String(actions.createNote)](
      state: State,
      action: ActionType<typeof actions.createNote>
    ) {
      return produce(state, draft => {
        const { id } = action.payload;
        draft.selectedNoteId = id;
      });
    },

    [String(actions.editNote)](
      state: State,
      action: ActionType<typeof actions.editNote>
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
