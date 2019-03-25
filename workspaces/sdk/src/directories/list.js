// @flow
import assert from 'minimalistic-assert';
import fs from 'fs-extra';

import { toNotePath, toDirectoryPath } from '../utils';

type Directory = {
  type: 'directory',
  title: string,
  id: string,
};

type Note = {
  type: 'note',
  title: string,
  id: string,
};

export const TYPES = Object.freeze({
  DIRECTORY: 'directory',
  NOTE: 'note',
});

const readFile = async filePath => {
  const fileContents = await fs.readFile(filePath, 'utf8');

  return JSON.parse(fileContents);
};

const getTitle = async filePath => {
  const { title } = await readFile(filePath);

  return title;
};

const formatAsDirectory = async (id): Promise<Directory> => ({
  title: await getTitle(toDirectoryPath(id)),
  type: TYPES.DIRECTORY,
  id,
});

const formatAsNote = async (id): Promise<Note> => ({
  title: await getTitle(toNotePath(id)),
  type: TYPES.NOTE,
  id,
});

const listDirectory = async (id: string): Promise<Array<Directory | Note>> => {
  const dirPath = toDirectoryPath(id);
  assert(await fs.exists(dirPath), `Directory "${id}" doesn't exist.`);

  const { directories, notes } = await readFile(dirPath);

  const lookups = [
    ...directories.map(formatAsDirectory),
    ...notes.map(formatAsNote),
  ];

  return Promise.all(lookups);
};

export default listDirectory;
