// @flow
import { NOTEBOOK_ROOT } from '@ponder/sdk';

import { createReduxState } from '../../utils/testing';
import { getNotebookId } from '../notebooks';

describe('Notebook selectors', () => {
  describe('getNotebookId', () => {
    it('pulls the selected notebook ID', () => {
      const state = createReduxState(state => {
        state.navigation.path = ['a', 'b', 'c'];
      });

      const id = getNotebookId(state);

      expect(id).toBe('c');
    });

    it('uses the notebook root if the path is empty', () => {
      const state = createReduxState(state => {
        state.navigation.path = [];
      });

      const id = getNotebookId(state);

      expect(id).toBe(NOTEBOOK_ROOT);
    });
  });
});
