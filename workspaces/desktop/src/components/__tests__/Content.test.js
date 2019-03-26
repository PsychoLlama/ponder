// @flow
import { renderer } from '@ponder/test-utils';
import { NOTEBOOK_ROOT } from '@ponder/sdk';

import { Content, CreateNote, mapStateToProps } from '../Content';
import { selector } from '../../utils/testing';

describe('Content', () => {
  const setup = renderer(Content, {
    getDefaultProps: () => ({
      selectedNotebook: 'selected-notebook-id',
      createNote: jest.fn(),
      isEditingNote: false,
    }),
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

  it('creates a new note when requested', () => {
    const { output, props } = setup();
    output.find(CreateNote).simulate('click');

    expect(props.createNote).toHaveBeenCalledWith({
      notebook: props.selectedNotebook,
    });
  });

  it('defaults to the root notebook', () => {
    const { output, props } = setup({ selectedNotebook: undefined });
    output.find(CreateNote).simulate('click');

    expect(props.createNote).toHaveBeenCalledWith({
      notebook: NOTEBOOK_ROOT,
    });
  });

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {});

    it('indicates if a note has been selected', () => {
      const { props } = select(state => {
        state.notebook.selectedNoteId = 'note-id';
      });

      expect(props.isEditingNote).toBe(true);
    });

    it('shows the currently selected notebook', () => {
      const { props } = select(state => {
        state.notebook.path = ['first', 'second', 'third'];
      });

      expect(props.selectedNotebook).toBe('third');
    });
  });
});
