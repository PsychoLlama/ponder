// @flow
import { NOTEBOOK_ROOT } from '@ponder/sdk';
import { renderer } from '@ponder/test-utils';
import { mount } from 'enzyme';
import React from 'react';

import { Note, Nav, Notebook, Notebooks, mapStateToProps } from '../Notebooks';
import { selector } from '../../utils/testing';
import colors from '../../config/colors';

describe('Notebooks', () => {
  const setup = renderer(Notebooks, {
    getDefaultProps: () => ({
      selectedNoteId: 'note-1',
      closeNote: jest.fn(),
      editNote: jest.fn(),
      entries: [
        { id: 'notebook-1', type: 'notebook' },
        { id: 'notebook-2', type: 'notebook' },
        { id: 'notebook-3', type: 'notebook' },
        { id: 'note-1', type: 'note' },
        { id: 'note-2', type: 'note' },
        { id: 'note-3', type: 'note' },
        { id: 'note-4', type: 'note' },
        { id: 'note-5', type: 'note' },
      ],
    }),

    configure({ output }) {
      const nav = output.find(Nav).getElement();
      const mockNavRef = { mock: 'nav dom ref' };

      if (nav.ref) {
        nav.ref(mockNavRef);
      }

      return {
        mockNavRef,
        createClickEvent: (target = mockNavRef) => ({
          target,
        }),
      };
    },
  });

  it('renders', () => {
    setup();
  });

  it('shows all the notebooks', () => {
    const { output, props } = setup();
    const notebooks = output.find(Notebook);

    expect(notebooks.length).toBe(props.notebooks.length);
    notebooks.forEach((notebook, index) => {
      expect(notebook.prop('children')).toBe(props.notebooks[index].title);
    });
  });

  it('shows all the notes', () => {
    const { output, props } = setup();
    const notes = output.find(Note);

    expect(notes.length).toBe(props.notes.length);
    notes.forEach((note, index) => {
      expect(note.prop('children')).toBe(props.notes[index].title);
    });
  });

  it('edits the note when selected', () => {
    const { output, props } = setup();
    const note = output.find(Note).at(1);
    note.simulate('click');

    expect(props.editNote).toHaveBeenCalledWith(props.notes[1].id);
  });

  it('ignores click events if the note is already selected', () => {
    const { output, props } = setup({ selectedNoteId: 'note-1' });
    const note = output.find(Note).first();
    note.simulate('click');

    expect(props.editNote).not.toHaveBeenCalled();
  });

  it('marks notes as selected', () => {
    const { output } = setup({ selectedNoteId: 'note-2' });
    const notes = output.find(Note);

    expect(notes.at(1).prop('selected')).toBe(true);
    expect(notes.at(2).prop('selected')).toBe(false);
    expect(notes.at(0).prop('selected')).toBe(false);
  });

  it('shows when a note is untitled', () => {
    const { output } = setup({
      notes: [{ title: '', id: '1' }],
    });

    const note = output.find(Note);

    expect(note.prop('children')).toMatch(/untitled/i);
  });

  it('closes the note when clicking an empty part of the navbar', () => {
    const { output, props, createClickEvent } = setup();
    const event = createClickEvent();
    output.find(Nav).simulate('click', event);

    expect(props.closeNote).toHaveBeenCalled();
  });

  it('ignores clicks on non-empty parts of the navbar', () => {
    const { output, props, createClickEvent } = setup();
    const event = createClickEvent({ mock: 'not nav' });
    output.find(Nav).simulate('click', event);

    expect(props.closeNote).not.toHaveBeenCalled();
  });

  describe('Note', () => {
    const setup = merge => {
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
      const { output: unselected } = setup();

      expect(selected).toHaveStyleRule('color', colors.primary);
      expect(unselected).not.toHaveStyleRule('color', colors.primary);
    });
  });

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {});

    it('pulls the selected note ID', () => {
      const { props, state } = select(state => {
        state.notebooks[NOTEBOOK_ROOT] = { contents: [] };
      });

      expect(props.selectedNoteId).toBe(state.navigation.note);
    });

    it('pulls the list of notebook entries', () => {
      const notebook = { type: 'notebook', id: '2' };
      const note = { type: 'note', id: '1' };
      const { props, state } = select(state => {
        state.navigation.path = [];
        state.notebooks[NOTEBOOK_ROOT] = { contents: [notebook, note] };
      });

      expect(props.entries).toBe(state.notebooks[NOTEBOOK_ROOT].contents);
    });

    it('survives if the notebook has not been loaded yet', () => {
      const { props } = select();

      expect(props.entries).toBeUndefined();
    });
  });
});
