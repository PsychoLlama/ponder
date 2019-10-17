// @flow
import assert from 'minimalistic-assert';
import fs from 'fs-extra';

import { toNotePath, toNotebookPath } from '../utils';
import { readAsJson } from '../fs';

type Notebook = {
  type: 'notebook',
  title: string,
  id: string,
};

type Note = {
  type: 'note',
  title: string,
  id: string,
};

export type NotebookContents = Array<Note | Notebook>;

export const TYPES = Object.freeze({
  NOTEBOOK: 'notebook',
  NOTE: 'note',
});

const getTitle = async filePath => {
  const { title } = await readAsJson(filePath);

  return title;
};

const formatAsNotebook = async (id): Promise<Notebook> => ({
  title: await getTitle(toNotebookPath(id)),
  type: TYPES.NOTEBOOK,
  id,
});

const formatAsNote = async (id): Promise<Note> => ({
  title: await getTitle(toNotePath(id)),
  type: TYPES.NOTE,
  id,
});

const listNotebook = async (id: string): Promise<NotebookContents> => {
  const dirPath = toNotebookPath(id);
  assert(await fs.exists(dirPath), `Notebook "${id}" doesn't exist.`);

  const { notebooks, notes } = await readAsJson(dirPath);

  const lookups = [
    ...notebooks.map(formatAsNotebook),
    ...notes.map(formatAsNote),
  ];

  return Promise.all(lookups);
};

export default listNotebook;
