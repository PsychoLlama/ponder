import { updateAsJson, writeAsJson } from '../fs';
import { toNotebookPath } from '../utils';
import { Notebook } from '../types';

const createNotebook = async ({
  notebook,
  title,
  id,
}: {
  notebook: string;
  title: string;
  id: string;
}) => {
  await updateAsJson<Notebook>(
    toNotebookPath(notebook),
    (notebook: Notebook) => {
      notebook.notebooks.push(id);
    }
  );

  await writeAsJson(toNotebookPath(id), {
    title,
    notebooks: [],
    notes: [],
  });

  return id;
};

export default createNotebook;
