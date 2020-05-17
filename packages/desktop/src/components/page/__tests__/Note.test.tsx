import { renderer } from '@ponder/test-utils';
import { Input } from '@ponder/ui';

import { Note, DeleteNote, mapStateToProps } from '../Note';
import { selector } from '../../../utils/testing';
import Section from '../Section';

describe('Note', () => {
  const setup = renderer(Note, {
    getDefaultProps: () => ({
      renameNote: jest.fn(),
      deleteNote: jest.fn(),
      title: 'Note title',
      noteId: 'note-id',
      notebookId: 'notebook-id',
      sections: ['section-1', 'section-2'],
    }),
  });

  it('renders', () => {
    expect(setup).not.toThrow();
  });

  it('survives onChange events', () => {
    const { output } = setup();

    output.find(Input).simulate('change', 'content');
  });

  it('shows the note title', () => {
    const { output, props } = setup();
    const note = output.find(Input);

    expect(note.prop('value')).toBe(props.title);
  });

  it('renames the note when the title changes', () => {
    const { output, props } = setup();
    const title = 'New title';

    output.find(Input).simulate('change', title);

    expect(props.renameNote).toHaveBeenCalledWith({
      id: props.noteId,
      title,
    });
  });

  it('renders each section', () => {
    const { output, props } = setup();

    const sections = output.find(Section);

    expect(sections.length).toBe(props.sections.length);
  });

  it('deletes the note when you click the delete button', () => {
    const { output, props } = setup();

    output.find(DeleteNote).simulate('click');

    expect(props.deleteNote).toHaveBeenCalledWith({
      noteId: props.noteId,
      notebookId: props.notebookId,
    });
  });

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {
      defaultProps: {},
    });

    it('grabs the selected note ID', () => {
      const { props, state } = select((state) => {
        const note = { type: 'note', id: 'note', title: 'Title' };
        state.navigation.note = note.id;
        state.notes[note.id] = {
          title: note.title,
          sections: [],
        };
      });

      expect(props.noteId).toBe(state.navigation.note);
    });

    it('grabs the note title', () => {
      const { props } = select((state) => {
        const note = { type: 'note', id: 'note', title: 'Title' };
        state.navigation.note = note.id;
        state.notes[note.id] = {
          title: note.title,
          sections: [],
        };
      });

      expect(props.title).toBe('Title');
    });

    it('throws an error if there is no selected note', () => {
      const fail = () =>
        select((state) => {
          state.navigation.note = 'note';
        });

      expect(fail).toThrow(/selected/i);
    });

    it('grabs the list of sections', () => {
      const sections = [];
      const { props } = select((state) => {
        state.navigation.note = 'id';
        state.notes['id'] = {
          title: 'Title',
          sections,
        };
      });

      expect(props.sections).toBe(sections);
    });

    it('grabs the notebook ID', () => {
      const { props } = select((state) => {
        state.navigation.path = ['a', 'b', 'c'];
        state.navigation.note = 'id';
        state.notes.id = {
          title: 'Title',
          sections: [],
        };
      });

      expect(props.notebookId).toBe('c');
    });
  });
});
