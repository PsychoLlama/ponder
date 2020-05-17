import updateNote from '../notes/update';
import { Section, Note } from '../types';

const insertSection = async (
  noteId: string,
  sectionIndex: number,
  section: Section
) => {
  return updateNote(noteId, (note: Note) => {
    note.sections.splice(sectionIndex, 0, section);
  });
};

export default insertSection;
