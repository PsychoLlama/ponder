// @flow
import { toNotePath } from '../utils';
import { updateAsJson } from '../fs';
import { Note } from '../types';

const renameNote = async ({ id, title }: { id: string; title: string }) => {
  const notePath = toNotePath(id);

  await updateAsJson<Note>(notePath, (note: Note) => {
    note.title = title;
  });
};

export default renameNote;
