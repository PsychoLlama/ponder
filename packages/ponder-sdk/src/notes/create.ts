import { toNotebookPath, toNotePath } from '../utils';
import { writeAsJson, updateAsJson } from '../fs';
import { Notebook } from '../types';

const createNote = async ({
  notebook,
  title,
  id,
}: {
  notebook: string;
  title: string;
  id: string;
}) => {
  const notebookPath = toNotebookPath(notebook);
  const notePath = toNotePath(id);

  await updateAsJson<Notebook>(notebookPath, (notebook: Notebook) => {
    notebook.notes.push(id);
  });

  await writeAsJson(notePath, {
    title,
    sections: [],
  });

  return id;
};

export default createNote;
