// @flow
import fs from 'fs-extra';
import path from 'path';

import { HOME, DIRECTORIES, CONFIG_FILE, NOTES } from './vars';
import { serialize } from './utils';

export default async () => {
  if (await fs.exists(HOME)) return;
  const config = serialize({
    // TODO: define config file structure.
  });

  const dirIndex = serialize({
    title: 'Index',
    directories: [],
    notes: [],
  });

  await fs.mkdir(HOME);
  await fs.writeFile(CONFIG_FILE, config);
  await fs.mkdir(DIRECTORIES);
  await fs.mkdir(NOTES);
  await fs.writeFile(path.join(DIRECTORIES, 'index.json'), dirIndex);
};
