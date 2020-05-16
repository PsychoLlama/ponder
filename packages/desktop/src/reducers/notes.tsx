// @flow
import { handleActions, type ActionType } from 'redux-actions';
import { produce } from 'immer';

import * as actions from '../actions/notebook';
import { notes, type Notes } from './state';

export default handleActions<Notes, *>(
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

    [String(actions.openRootNotebook)]: produce(
      (state: Notes, action: ActionType<typeof actions.openRootNotebook>) => {
        const notes = action.payload.filter((entry) => entry.type === 'note');

        notes.forEach(({ id, title }) => {
          state[id] = {
            sections: [],
            title,
          };
        });
      }
    ),

    [String(actions.editNote)]: produce(
      (state: Notes, action: ActionType<typeof actions.editNote>) => {
        const { id, sections } = action.payload;
        state[id].sections = sections.map((section) => section.id);
      }
    ),
  },
  notes
);
