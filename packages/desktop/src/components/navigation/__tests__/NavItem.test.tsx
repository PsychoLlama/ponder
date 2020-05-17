import React from 'react';
import { mount } from 'enzyme';
import { renderer } from '@ponder/test-utils';

import { selector } from '../../../utils/testing';
import { NavItem, Note, Notebook, mapStateToProps } from '../NavItem';
import colors from '../../../config/colors';

describe('NavItem', () => {
  const setup = renderer(NavItem, {
    getDefaultProps: () => ({
      type: 'note',
      id: 'mock-id',
      title: 'Note title',
      editNote: jest.fn(),
      selected: false,
    }),
  });

  it('renders the correct type', () => {
    const { output: notebook } = setup({ type: 'notebook' });
    const { output: note } = setup({ type: 'note' });

    expect(notebook.find(Notebook).exists()).toBe(true);
    expect(notebook.find(Note).exists()).toBe(false);

    expect(note.find(Notebook).exists()).toBe(false);
    expect(note.find(Note).exists()).toBe(true);
  });

  it('shows the title', () => {
    const { output, props } = setup({ type: 'note' });

    const note = output.find(Note);

    expect(note.text()).toBe(props.title);
  });

  it('provides default titles', () => {
    const { output: notebook } = setup({ type: 'notebook', title: '' });
    const { output: note } = setup({ type: 'note', title: '' });

    expect(notebook.text()).toMatch(/untitled notebook$/i);
    expect(note.text()).toMatch(/untitled note$/i);
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

  describe('Note', () => {
    const setup = <T,>(merge?: T) => {
      const props = {
        selected: false,
        ...merge,
      };

      return {
        output: mount(<Note {...props} />),
        props,
      };
    };

    it('renders', () => {
      expect(setup).not.toThrow();
    });

    it('shows a different color while selected', () => {
      const { output: selected } = setup({ selected: true });
      const { output: notSelected } = setup({ selected: false });

      expect(selected).toHaveStyleRule('color', colors.primary);
      expect(notSelected).toHaveStyleRule('color', colors.mutedText);
    });
  });

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {
      defaultProps: {
        id: 'mock-id',
        type: 'note',
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
        { type: 'notebook' }
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
        { type: 'note', id: noteId }
      );

      expect(props.selected).toBe(true);
    });
  });
});
