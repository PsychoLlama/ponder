import * as fs from 'fs-extra';

import { toNotePath, toNotebookPath } from '../utils';
import { updateAsJson } from '../fs';
import { Notebook } from '../types';

export default async function deleteNote({
  noteId,
  notebookId,
}: {
  noteId: string;
  notebookId: string;
}) {
  await Promise.all([
    fs.unlink(toNotePath(noteId)),
    updateAsJson<Notebook>(toNotebookPath(notebookId), (notebook) => {
      notebook.notes = notebook.notes.filter((id) => id !== noteId);
    }),
  ]);
}
