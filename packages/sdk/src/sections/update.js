// @flow
import updateNote from '../notes/update';

const updateSection = <Update: Function>(
  noteId: string,
  sectionIndex: number,
  update: Update
) => {
  return updateNote(noteId, (note) => {
    return update(note.sections[sectionIndex]);
  });
};

export default updateSection;
