// @flow
import uuid from 'uuid/v4';
import fs from 'fs-extra';

import { toDirectoryPath, toNotePath, readAsJson, serialize } from '../utils';

const createNote = async ({
  title,
  directory,
}: {
  title: string,
  directory: string,
}) => {
  const dirPath = toDirectoryPath(directory);
  const dir = await readAsJson(dirPath);

  const id = uuid();
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
