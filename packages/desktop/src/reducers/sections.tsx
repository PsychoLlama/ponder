// @flow
import { produce } from 'immer';
import { createReducer } from 'retreon';
import { Section } from '@ponder/sdk';

import { sections as initialState } from './state';
import * as actions from '../actions/notebook';

const addSectionsFromAction = produce((state, { sections }) => {
  sections.forEach((section: Section) => {
    state[section.id] = {
      type: section.type,
      content: section.content,
    };
  });
});

export default createReducer(initialState, (handleAction) => [
  handleAction(actions.editNote, addSectionsFromAction),
  handleAction(actions.createNote, addSectionsFromAction),
]);
