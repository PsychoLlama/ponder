// @flow
import fs from 'fs-extra';
import path from 'path';

import { HOME, NOTEBOOKS, CONFIG_FILE, NOTES, ROOT_DIR } from './vars';
import { serialize } from './utils';

export default async () => {
  if (await fs.exists(HOME)) return;
  const config = serialize({
    // TODO: define config file structure.
  });

  const dirIndex = serialize({
    title: 'Notebook',
    notebooks: [],
    notes: [],
  });

  await fs.mkdir(HOME);
  await fs.writeFile(CONFIG_FILE, config);
  await fs.mkdir(NOTEBOOKS);
  await fs.mkdir(NOTES);
  await fs.writeFile(path.join(NOTEBOOKS, `${ROOT_DIR}.json`), dirIndex);
};
