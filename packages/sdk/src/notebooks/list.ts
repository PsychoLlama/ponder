// @flow
import assert from 'minimalistic-assert';
import fs from 'fs-extra';

import { toNotePath, toNotebookPath } from '../utils';
import { readAsJson } from '../fs';
import { EntityType, Note, Notebook } from '../public-types';

export type NotebookContents = Array<Note | Notebook>;

const formatAsNotebook = async (id: string): Promise<Notebook> => {
  const { title } = await readAsJson(toNotebookPath(id));

  return {
    title,
    type: EntityType.Notebook,
    id,
  };
};

const formatAsNote = async (id: string): Promise<Note> => {
  const { title, sections } = await readAsJson(toNotePath(id));
  return {
    type: EntityType.Note,
    title,
    sections,
    id,
  };
};

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
