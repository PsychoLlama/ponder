// @flow
import { toNotePath } from '../utils';
import { readAsJson } from '../fs';
import { Note } from '../types';

const readNote = (id: string): Promise<Note> => {
  const notePath = toNotePath(id);
  return readAsJson(notePath);
};

export default readNote;
