// @flow
import fs from 'fs-extra';
import path from 'path';

import { DIRECTORIES } from '../vars';

const toDirectoryPath = id => path.join(DIRECTORIES, `${id}.json`);

const readFile = async filePath => {
  const fileContents = await fs.readFile(filePath, 'utf8');

  return JSON.parse(fileContents);
};

export default (id: string) => readFile(toDirectoryPath(id));
