// @flow
import { toNotePath } from '../utils';
import { readAsJson } from '../fs';

const readNote = (id: string) => {
  const notePath = toNotePath(id);
  return readAsJson(notePath);
};

export default readNote;
