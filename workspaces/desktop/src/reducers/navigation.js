// @flow
import { handleActions, type ActionType } from 'redux-actions';
import type { NotebookContents } from '@ponder/sdk';
import produce from 'immer';

import * as actions from '../actions/navigation';

export type State = {
  // The "directory" contents (both notes and notebooks).
  items: NotebookContents,
  // The "directory" path that took us here.
  path: string[],
};

export const initialState: State = {
  items: [],
  path: [],
};

export default handleActions(
  {
    [String(actions.openRootNotebook)](
      state: State,
      action: ActionType<typeof actions.openRootNotebook>
    ) {
      return produce(state, draft => {
        draft.items = action.payload;
        draft.path = [];
      });
    },
  },
  initialState
);
