// @flow
import { toNotePath, readAsJson } from '../utils';

const readNote = (id: string) => {
  const notePath = toNotePath(id);
  return readAsJson(notePath);
};

export default readNote;
