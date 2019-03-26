// @flow
import { handleActions, type ActionType } from 'redux-actions';
import produce from 'immer';

import * as actions from '../actions/notebook';

type ItemMap = {
  [id: string]: {
    title: string,
    id: string,
  },
};

export type State = {
  selectedNoteId: string | null,
  path: string[],
  contents: {
    notebooks: ItemMap,
    notes: ItemMap,
  },
};

export const initialState: State = {
  selectedNoteId: null,
  path: [],
  contents: {
    notebooks: {},
    notes: {},
  },
};

export default handleActions(
  {
    [String(actions.openRootNotebook)](
      state: State,
      action: ActionType<typeof actions.openRootNotebook>
    ) {
      return produce(state, draft => {
        const notebooks = {};
        const notes = {};

        action.payload.forEach(item => {
          const map = item.type === 'note' ? notes : notebooks;

          map[item.id] = {
            title: item.title,
            id: item.id,
          };
        });

        Object.assign(draft.contents, { notes, notebooks });
        draft.path = [];
      });
    },

    [String(actions.createNote)](
      state: State,
      action: ActionType<typeof actions.createNote>
    ) {
      return produce(state, draft => {
        const { id, title } = action.payload;

        draft.contents.notes[id] = { id, title };
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

    [String(actions.renameNote)](
      state: State,
      action: ActionType<typeof actions.renameNote>
    ) {
      return produce(state, draft => {
        const { id, title } = action.payload;
        draft.contents.notes[id].title = title;
      });
    },
  },
  initialState
);
