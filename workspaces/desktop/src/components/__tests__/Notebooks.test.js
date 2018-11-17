// @flow
import { shallow } from 'enzyme';
import React from 'react';

import { Note, Notebook, Notebooks } from '../Notebooks';

describe('Notebooks', () => {
  const setup = merge => {
    const props = {
      notebooks: [
        { id: 'notebook-1', title: 'Notebook 1' },
        { id: 'notebook-2', title: 'Notebook 2' },
        { id: 'notebook-3', title: 'Notebook 3' },
      ],
      notes: [
        { id: 'note-1', title: 'Note 1' },
        { id: 'note-2', title: 'Note 2' },
        { id: 'note-3', title: 'Note 3' },
        { id: 'note-4', title: 'Note 4' },
        { id: 'note-5', title: 'Note 5' },
      ],
      editNote: jest.fn(),
      ...merge,
    };

    return {
      output: shallow(<Notebooks {...props} />),
      props,
    };
  };

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
    const note = output.find(Note).first();
    note.simulate('click');

    expect(props.editNote).toHaveBeenCalledWith(props.notes[0].id);
  });
});
