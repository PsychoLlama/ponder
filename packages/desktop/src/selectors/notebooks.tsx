// @flow
import { NOTEBOOK_ROOT } from '@ponder/sdk';

import type { ReduxState } from '../types/redux-store';

export const getNotebookId = (state: ReduxState) => {
  const [id = NOTEBOOK_ROOT] = state.navigation.path.slice(-1);

  return id;
};
