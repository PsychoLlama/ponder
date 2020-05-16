// @flow
import type { nothing } from 'immer';

import { toNotePath } from '../utils';
import { updateAsJson } from '../fs';
import { Note } from '../types';

const updateNote = <Update extends (state: Note) => void | typeof nothing>(
  id: string,
  fn: Update
) => {
  const notePath = toNotePath(id);
  return updateAsJson(notePath, fn);
};

export default updateNote;
