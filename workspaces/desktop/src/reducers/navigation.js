// @flow
import { handleActions, type ActionType } from 'redux-actions';
import type { NotebookContents } from '@ponder/sdk';
import produce from 'immer';

import * as notebookActions from '../actions/notebooks';
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

    [String(notebookActions.createNote)](
      state: State,
      action: ActionType<typeof notebookActions.createNote>
    ) {
      return produce(state, draft => {
        const { title, id } = action.payload;

        draft.items.unshift({
          type: 'note',
          title,
          id,
        });
      });
    },

    [String(notebookActions.renameNote)](
      state: State,
      action: ActionType<typeof notebookActions.renameNote>
    ) {
      return produce(state, draft => {
        const { id, title } = action.payload;
        const note = draft.items.find(note => note.id === id);

        if (!note) {
          throw new Error(`Can't rename note. It doesn't exists (${id}).`);
        }

        note.title = title;
      });
    },
  },
  initialState
);
