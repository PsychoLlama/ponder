// @flow
import { NOTEBOOK_ROOT } from '@ponder/sdk';
import { renderer } from '@ponder/test-utils';

import { Nav, Navigation, mapStateToProps } from '../Navigation';
import { selector } from '../../../utils/testing';

describe('Navigation', () => {
  const setup = renderer(Navigation, {
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

    configure({ output, props }) {
      const nav = output.find(Nav).getElement();
      const mockNavRef = { mock: 'nav dom ref' };

      if (nav.ref) {
        nav.ref(mockNavRef);
      }

      return {
        mockNavRef,
        filterByType: (type) => {
          return props.entries.filter((entry) => entry.type === type);
        },
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
    const { output, filterByType } = setup();
    const notebooks = output.find({ type: 'notebook' });

    expect(notebooks.length).toBe(filterByType('notebook').length);
    notebooks.forEach((notebook, index) => {
      expect(notebook.prop('id')).toBe(filterByType('notebook')[index].id);
    });
  });

  it('shows all the notes', () => {
    const { output, filterByType } = setup();
    const notes = output.find({ type: 'note' });

    expect(notes.length).toBe(filterByType('note').length);
    notes.forEach((note, index) => {
      expect(note.prop('id')).toBe(filterByType('note')[index].id);
    });
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

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {});

    it('pulls the selected note ID', () => {
      const { props, state } = select((state) => {
        state.notebooks[NOTEBOOK_ROOT] = { title: '', contents: [] };
      });

      expect(props.selectedNoteId).toBe(state.navigation.note);
    });

    it('pulls the list of notebook entries', () => {
      const notebook = { type: 'notebook', id: '2' };
      const note = { type: 'note', id: '1' };
      const { props, state } = select((state) => {
        state.navigation.path = [];
        state.notebooks[NOTEBOOK_ROOT] = {
          title: '',
          contents: [notebook, note],
        };
      });

      expect(props.entries).toBe(state.notebooks[NOTEBOOK_ROOT].contents);
    });

    it('survives if the notebook has not been loaded yet', () => {
      const { props } = select();

      expect(props.entries).toBeUndefined();
    });
  });
});
