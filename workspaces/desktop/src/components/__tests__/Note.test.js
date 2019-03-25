// @flow
import { renderer } from '@ponder/test-utils';
import { Input } from '@ponder/ui';

import { Note, mapStateToProps } from '../Note';
import { selector } from '../../utils/testing';

describe('Note', () => {
  const setup = renderer(Note, {
    getDefaultProps: () => ({
      renameNote: jest.fn(),
      title: 'Note title',
      noteId: 'note-id',
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

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {});

    it('grabs the selected note ID', () => {
      const { props, state } = select(state => {
        const note = { type: 'note', id: 'note', title: 'Title' };
        state.notebooks.selectedNoteId = note.id;
        state.navigation.items = [note];
      });

      expect(props.noteId).toBe(state.notebooks.selectedNoteId);
    });

    it('grabs the note title', () => {
      const { props } = select(state => {
        const note = { type: 'note', id: 'note', title: 'Title' };
        state.notebooks.selectedNoteId = note.id;
        state.navigation.items = [note];
      });

      expect(props.title).toBe('Title');
    });

    it('throws an error if there is no selected note', () => {
      const fail = () =>
        select(state => {
          state.notebooks.selectedNoteId = null;
        });

      expect(fail).toThrow(/selected/i);
    });
  });
});
