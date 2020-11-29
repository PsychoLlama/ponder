import * as sdk from '@ponder/sdk';
import { v4 as uuid } from 'uuid';

export const openRootNotebook = () => sdk.readNotebook(sdk.NOTEBOOK_ROOT);

export async function createNote({ notebook }: { notebook: string }) {
  const id = uuid();
  const title = '';
  const section: sdk.Section = {
    type: sdk.SectionType.RichText,
    content: '',
    id: uuid(),
  };

  await sdk.createNote({
    title,
    notebook,
    id,
  });

  await sdk.insertSection(id, 0, section);

  return {
    title,
    notebook,
    id,
    sections: [section],
  };
}

export async function editNote(id: string) {
  const { sections } = await sdk.readNote(id);

  return { id, sections };
}

export async function updateNoteSection(config: {
  noteId: string;
  sectionIndex: number;
  content: string;
}) {
  await sdk.updateSection(
    config.noteId,
    config.sectionIndex,
    (section: sdk.Section) => {
      section.content = config.content;
    }
  );

  return config;
}

export { deleteNote, renameNote } from '@ponder/sdk';
