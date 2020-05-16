// @flow
import type { nothing } from 'immer';
import { Note, Section } from '../types';

import updateNote from '../notes/update';

const updateSection = <
  Update extends (state: Section) => void | typeof nothing
>(
  noteId: string,
  sectionIndex: number,
  update: Update
) => {
  return updateNote(noteId, (note: Note) => {
    return update(note.sections[sectionIndex]);
  });
};

export default updateSection;
