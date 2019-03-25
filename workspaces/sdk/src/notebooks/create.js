// @flow
import fs from 'fs-extra';
import path from 'path';

import { serialize, toNotebookPath, readAsJson } from '../utils';
import { NOTEBOOKS } from '../vars';

const createNotebook = async ({
  notebook,
  title,
  id,
}: {
  notebook: string,
  title: string,
  id: string,
}) => {
  const dir = await readAsJson(toNotebookPath(notebook));

  const newDirPath = path.join(NOTEBOOKS, `${id}.json`);
  const newDir = serialize({
    title,
    notebooks: [],
    notes: [],
  });

  await Promise.all([
    fs.writeFile(newDirPath, newDir),
    fs.writeFile(
      toNotebookPath(notebook),
      serialize({
        ...dir,
        notebooks: [...dir.notebooks, id],
      })
    ),
  ]);

  return id;
};

export default createNotebook;
