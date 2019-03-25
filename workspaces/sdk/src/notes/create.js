// @flow
import fs from 'fs-extra';

import { toNotebookPath, toNotePath, readAsJson, serialize } from '../utils';

const createNote = async ({
  notebook,
  title,
  id,
}: {
  notebook: string,
  title: string,
  id: string,
}) => {
  const dirPath = toNotebookPath(notebook);
  const dir = await readAsJson(dirPath);

  const notePath = toNotePath(id);

  await Promise.all([
    fs.writeFile(
      dirPath,
      serialize({
        ...dir,
        notes: [...dir.notes, id],
      })
    ),

    fs.writeFile(
      notePath,
      serialize({
        title,
        sections: [],
      })
    ),
  ]);

  return id;
};

export default createNote;
