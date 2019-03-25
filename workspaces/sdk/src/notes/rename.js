// @flow
import fs from 'fs-extra';

import { readAsJson, toNotePath, serialize } from '../utils';

const renameNote = async ({ id, title }: { id: string, title: string }) => {
  const notePath = toNotePath(id);
  const note = await readAsJson(notePath);

  const newNote = serialize({
    ...note,
    title,
  });

  await fs.writeFile(notePath, newNote);
};

export default renameNote;
