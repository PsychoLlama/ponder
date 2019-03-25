// @flow
import { createSelector } from 'reselect';
import styled from 'styled-components';
import { connect } from 'react-redux';
import React from 'react';

import type { ReduxState } from '../types/redux-store';
import * as actions from '../actions/notebooks';
import colors from '../config/colors';
import StatusBar from './StatusBar';

const Nav = styled.nav`
  width: 25vw;
  margin-top: 4px;
  overflow-y: auto;
  flex-grow: 1;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const List = styled.ol`
  margin: 0;
  padding: 0;
`;

const NavItem = styled.a.attrs({ href: '#' })`
  padding: 8px 24px;
  display: block;
  transition-property: padding-left, padding-right;
  transition-duration: 250ms;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  color: inherit;
  text-decoration: none;
  cursor: default;
  user-select: none;

  :hover {
    padding-left: 32px;
    padding-right: 16px;
  }
`;

export const Notebook = styled(NavItem)`
  font-size: 16px;
`;

export const Note = styled(NavItem)`
  color: ${props => (props.selected ? colors.primary : colors.mutedText)};
`;

type NoteCollection = {
  title: string,
  id: string,
};

// For now, they're identical.
type NoteObject = NoteCollection;

type Props = {
  editNote: typeof actions.editNote,
  notebooks: Array<NoteCollection>,
  selectedNoteId: string | null,
  notes: Array<NoteObject>,
};

export class Notebooks extends React.Component<Props> {
  render() {
    const { notes, notebooks } = this.props;

    return (
      <Sidebar>
        <Nav>
          <List>
            {notebooks.map(this.renderNotebook)}
            {notes.map(this.renderNote)}
          </List>
        </Nav>

        <StatusBar>All</StatusBar>
      </Sidebar>
    );
  }

  renderNotebook = (notebook: NoteCollection) => {
    return <Notebook key={notebook.id}>{notebook.title}</Notebook>;
  };

  renderNote = (note: NoteObject) => {
    const selected = note.id === this.props.selectedNoteId;
    const selectNote = this.props.editNote.bind(null, note.id);

    return (
      <Note
        onClick={selected ? undefined : selectNote}
        selected={selected}
        key={note.id}
      >
        {note.title}
      </Note>
    );
  };
}

const identity = value => value;
const isType = type => item => item.type === type;

const selectNotes = createSelector(
  identity,
  items => items.filter(isType('note'))
);

const selectNotebooks = createSelector(
  identity,
  items => items.filter(isType('notebook'))
);

export const mapStateToProps = ({ notebooks, navigation }: ReduxState) => ({
  notebooks: selectNotebooks(navigation.items),
  selectedNoteId: notebooks.selectedNoteId,
  notes: selectNotes(navigation.items),
});

const mapDispatchToProps = {
  editNote: actions.editNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebooks);
