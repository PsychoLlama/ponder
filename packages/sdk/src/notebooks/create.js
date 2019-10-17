// @flow
import { updateAsJson, writeAsJson } from '../fs';
import { toNotebookPath } from '../utils';

const createNotebook = async ({
  notebook,
  title,
  id,
}: {
  notebook: string,
  title: string,
  id: string,
}) => {
  await updateAsJson(toNotebookPath(notebook), notebook => {
    notebook.notebooks.push(id);
  });

  await writeAsJson(toNotebookPath(id), {
    title,
    notebooks: [],
    notes: [],
  });

  return id;
};

export default createNotebook;
