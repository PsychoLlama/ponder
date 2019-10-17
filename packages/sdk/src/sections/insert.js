// @flow
import updateNote from '../notes/update';

interface Section {
  type: string;
}

const insertSection = async (
  noteId: string,
  sectionIndex: number,
  section: Section
) => {
  return updateNote(noteId, note => {
    note.sections.splice(sectionIndex, 0, section);
  });
};

export default insertSection;
