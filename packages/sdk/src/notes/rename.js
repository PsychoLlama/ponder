// @flow
import { toNotePath } from '../utils';
import { updateAsJson } from '../fs';

const renameNote = async ({ id, title }: { id: string, title: string }) => {
  const notePath = toNotePath(id);

  await updateAsJson(notePath, (note) => {
    note.title = title;
  });
};

export default renameNote;
