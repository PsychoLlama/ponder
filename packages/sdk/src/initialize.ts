// @flow
import fs from 'fs-extra';

import { HOME, NOTEBOOKS, CONFIG_FILE, NOTES, NOTEBOOK_ROOT } from './vars';
import { toNotebookPath } from './utils';
import { writeAsJson } from './fs';

export default async () => {
  if (await fs.pathExists(HOME)) return;

  await fs.mkdir(HOME);
  await fs.mkdir(NOTEBOOKS);
  await fs.mkdir(NOTES);

  await writeAsJson(CONFIG_FILE, {
    // TODO: define config file structure.
  });

  await writeAsJson(toNotebookPath(NOTEBOOK_ROOT), {
    title: 'Notebook',
    notebooks: [],
    notes: [],
  });
};
