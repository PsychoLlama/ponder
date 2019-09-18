// @flow
import { handleActions, type ActionType } from 'redux-actions';
import { produce } from 'immer';

import { sections as initialState, type Sections } from './state';
import * as actions from '../actions/notebook';

export default handleActions<Sections, *>(
  {
    [String(actions.editNote)]: produce(
      (state: Sections, action: ActionType<typeof actions.editNote>) => {
        action.payload.sections.forEach(section => {
          state[section.id] = {
            type: section.type,
            content: section.content,
          };
        });
      }
    ),
  },
  initialState
);
