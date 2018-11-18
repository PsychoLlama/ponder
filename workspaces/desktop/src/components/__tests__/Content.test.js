// @flow
import { selector, renderer } from '../../utils/testing';
import { Content, CreateNote, mapStateToProps } from '../Content';

describe('Content', () => {
  const setup = renderer(Content, {
    defaultProps: {
      isEditingNote: false,
    },
  });

  it('renders', () => {
    setup();
  });

  it('shows a create note button when no note is selected', () => {
    const { output: withSelectedNote } = setup({ isEditingNote: true });
    const { output: noSelectedNote } = setup();

    expect(withSelectedNote.find(CreateNote).exists()).toBe(false);
    expect(noSelectedNote.find(CreateNote).exists()).toBe(true);
  });

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {});

    it('indicates if a note has been selected', () => {
      const { props } = select(state => {
        state.notebooks.selectedNoteId = 'note-id';
      });

      expect(props.isEditingNote).toBe(true);
    });
  });
});
