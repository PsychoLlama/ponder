// @flow
import { handleActions, type ActionType } from 'redux-actions';
import { produce } from 'immer';

import { sections as initialState, type Sections } from './state';
import * as actions from '../actions/notebook';

const addSectionsFromAction = produce(
  (
    state: Sections,
    action:
      | ActionType<typeof actions.editNote>
      | ActionType<typeof actions.createNote>
  ) => {
    action.payload.sections.forEach((section) => {
      state[section.id] = {
        type: section.type,
        content: section.content,
      };
    });
  }
);

export default handleActions<Sections, *>(
  {
    [String(actions.editNote)]: addSectionsFromAction,
    [String(actions.createNote)]: addSectionsFromAction,
  },
  initialState
);
