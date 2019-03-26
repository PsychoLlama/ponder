// @flow
import { toNotePath } from '../utils';
import { updateAsJson } from '../fs';

const updateNote = <Update: Function>(id: string, fn: Update) => {
  const notePath = toNotePath(id);
  return updateAsJson(notePath, fn);
};

export default updateNote;
