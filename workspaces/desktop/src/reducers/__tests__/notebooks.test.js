// @flow
import { NOTEBOOK_ROOT } from '@ponder/sdk';

import reducer from '../notebooks';
import * as actions from '../../actions/notebook';

describe('Notebooks reducer', () => {
  describe('openRootNotebook', () => {
    const createAction = (payload = []) => ({
      type: String(actions.openRootNotebook),
      payload,
    });

    it('adds note & notebook information to the map', () => {
      const items = [
        { type: 'notebook', title: 'Notebook title', id: 1 },
        { type: 'note', title: 'Note title', id: 2 },
      ];

      const action = createAction(items);
      const state = reducer(undefined, action);

      expect(state).toEqual({
        [NOTEBOOK_ROOT]: {
          notebooks: {
            [1]: 'Notebook title',
          },
          notes: {
            [2]: 'Note title',
          },
        },
      });
    });
  });

  describe('createNote', () => {
    const createAction = patch => ({
      type: String(actions.createNote),
      payload: {
        title: 'New note',
        notebook: NOTEBOOK_ROOT,
        id: '<note-id>',
        ...patch,
      },
    });

    it('adds the note to the corresponding notebook', () => {
      const withNotebook = {
        steve: {
          notebooks: {},
          notes: {},
        },
      };

      const action = createAction();
      const state = reducer(withNotebook, action);

      expect(state).toEqual({
        steve: {
          notebooks: {},
          notes: {},
        },
      });
    });
  });
});
