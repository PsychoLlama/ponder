// @flow
import uuid from 'uuid/v4';
import fs from 'fs-extra';
import path from 'path';

import { serialize, toDirectoryPath } from '../utils';
import { DIRECTORIES } from '../vars';
import readDirectory from './read';

const createDirectory = async ({
  under,
  title,
}: {
  under: string,
  title: string,
}) => {
  const dir = await readDirectory(under);
  const id = uuid();

  const newDirPath = path.join(DIRECTORIES, `${id}.json`);
  const newDir = serialize({
    title,
    directories: [],
    notes: [],
  });

  await fs.writeFile(newDirPath, newDir);
  await fs.writeFile(
    toDirectoryPath(under),
    serialize({
      ...dir,
      directories: [...dir.directories, id],
    })
  );

  return id;
};

export default createDirectory;
