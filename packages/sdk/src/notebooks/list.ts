// @flow
import assert from 'minimalistic-assert';
import fs from 'fs-extra';

import { toNotePath, toNotebookPath } from '../utils';
import { readAsJson } from '../fs';
import { Notebook, Note } from '../types';

export type NotebookContents = Array<Note | Notebook>;

export enum Types {
  Notebook = 'notebook',
  Note = 'note',
}

const getTitle = async (filePath: string) => {
  const { title } = await readAsJson(filePath);

  return title;
};

const formatAsNotebook = async (id: string): Promise<Notebook> => ({
  title: await getTitle(toNotebookPath(id)),
  type: Types.Notebook,
  id,
});

const formatAsNote = async (id: string): Promise<Note> => ({
  title: await getTitle(toNotePath(id)),
  type: Types.Note,
  id,
});

const listNotebook = async (id: string): Promise<NotebookContents> => {
  const dirPath = toNotebookPath(id);
  assert(await fs.pathExists(dirPath), `Notebook "${id}" doesn't exist.`);

  const { notebooks, notes } = await readAsJson(dirPath);

  const lookups = [
    ...notebooks.map(formatAsNotebook),
    ...notes.map(formatAsNote),
  ];

  return Promise.all(lookups);
};

export default listNotebook;
