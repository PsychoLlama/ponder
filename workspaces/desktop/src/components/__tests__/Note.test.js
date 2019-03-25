// @flow
import { renderer } from '@ponder/test-utils';
import { Input } from '@ponder/ui';

import { Note, mapStateToProps } from '../Note';
import { selector } from '../../utils/testing';

describe('Note', () => {
  const setup = renderer(Note, {
    getDefaultProps: () => ({
      title: 'Note title',
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

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {});

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
