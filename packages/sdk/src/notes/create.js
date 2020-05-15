// @flow
import { toNotebookPath, toNotePath } from '../utils';
import { writeAsJson, updateAsJson } from '../fs';

const createNote = async ({
  notebook,
  title,
  id,
}: {
  notebook: string,
  title: string,
  id: string,
}) => {
  const notebookPath = toNotebookPath(notebook);
  const notePath = toNotePath(id);

  await updateAsJson(notebookPath, (notebook) => {
    notebook.notes.push(id);
  });

  await writeAsJson(notePath, {
    title,
    sections: [],
  });

  return id;
};

export default createNote;
