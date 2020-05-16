// @flow
import type { nothing } from 'immer';

import { toNotePath } from '../utils';
import { updateAsJson } from '../fs';

const updateNote = <Update extends (state: unknown) => void | typeof nothing>(
  id: string,
  fn: Update
) => {
  const notePath = toNotePath(id);
  return updateAsJson(notePath, fn);
};

export default updateNote;
