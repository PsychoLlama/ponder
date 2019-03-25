// @flow
import { readNotebook, NOTEBOOK_ROOT } from '@ponder/sdk';
import { createAction } from 'redux-actions';

export const openRootNotebook = createAction(
  'navigation/open-root-notebook',
  async () => readNotebook(NOTEBOOK_ROOT)
);
