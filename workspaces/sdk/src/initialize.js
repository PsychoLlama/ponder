// @flow
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export const HOME = path.join(os.homedir(), '.ponder');
export const CONFIG_FILE = path.join(HOME, 'config.json');
export const DIRECTORIES = path.join(HOME, 'directories');
export const NOTES = path.join(HOME, 'notes');

// Pretty-print the JSON with a trailing newline.
const serialize = json => JSON.stringify(json, null, 2) + '\n';

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
