import { renderer } from '@ponder/test-utils';
import { EntityType } from '@ponder/sdk';

import { selector } from '../../../utils/testing';
import { NavItem, Note, Notebook, mapStateToProps } from '../NavItem';

describe('NavItem', () => {
  const setup = renderer(NavItem, {
    getDefaultProps: () => ({
      type: EntityType.Note,
      id: 'mock-id',
      title: 'Note title',
      editNote: jest.fn(),
      selected: false,
    }),
  });

  it('renders the correct type', () => {
    const { output: notebook } = setup({ type: EntityType.Notebook });
    const { output: note } = setup({ type: EntityType.Note });

    expect(notebook.find(Notebook).exists()).toBe(true);
    expect(notebook.find(Note).exists()).toBe(false);

    expect(note.find(Notebook).exists()).toBe(false);
    expect(note.find(Note).exists()).toBe(true);
  });

  it('shows the title', () => {
    const { output, props } = setup({ type: EntityType.Note });

    const note = output.find(Note);

    expect(note.text()).toBe(props.title);
  });

  it('provides default titles', () => {
    const { output: note } = setup({ type: EntityType.Note, title: '' });
    const { output: notebook } = setup({
      type: EntityType.Notebook,
      title: '',
    });

    expect(note.text()).toMatch(/untitled note$/i);
    expect(notebook.text()).toMatch(/untitled notebook$/i);
  });

  it('selects the note when clicked', () => {
    const { output, props } = setup();

    output.find(Note).simulate('click');

    expect(props.editNote).toHaveBeenCalledWith(props.id);
  });

  it('ignores click events when the note is selected', () => {
    const { output, props } = setup({ selected: true });

    output.find(Note).simulate('click');

    expect(props.editNote).not.toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {
      defaultProps: {
        id: 'mock-id',
        type: EntityType.Note,
      },
    });

    it('grabs the title for notes', () => {
      const title = 'Note title';
      const { props } = select((state) => {
        state.notes['mock-id'] = { title, sections: [] };
      });

      expect(props.title).toBe(title);
    });

    it('grabs the title for notebooks', () => {
      const title = 'Notebook title';
      const { props } = select(
        (state) => {
          state.notebooks['mock-id'] = { title, contents: [] };
        },
        { type: EntityType.Notebook }
      );

      expect(props.title).toBe(title);
    });

    it('indicates if the note is selected', () => {
      const noteId = 'mock-note-id';
      const { props } = select(
        (state) => {
          state.notes[noteId] = { title: '', sections: [] };
          state.navigation.note = noteId;
        },
        { type: EntityType.Note, id: noteId }
      );

      expect(props.selected).toBe(true);
    });
  });
});
