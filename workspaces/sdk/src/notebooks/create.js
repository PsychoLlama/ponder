// @flow
import uuid from 'uuid/v4';
import fs from 'fs-extra';
import path from 'path';

import { serialize, toNotebookPath, readAsJson } from '../utils';
import { NOTEBOOKS } from '../vars';

const createNotebook = async ({
  under,
  title,
}: {
  under: string,
  title: string,
}) => {
  const dir = await readAsJson(toNotebookPath(under));
  const id = uuid();

  const newDirPath = path.join(NOTEBOOKS, `${id}.json`);
  const newDir = serialize({
    title,
    notebooks: [],
    notes: [],
  });

  await fs.writeFile(newDirPath, newDir);
  await fs.writeFile(
    toNotebookPath(under),
    serialize({
      ...dir,
      notebooks: [...dir.notebooks, id],
    })
  );

  return id;
};

export default createNotebook;
