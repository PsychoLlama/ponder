// @flow
import styled from 'styled-components';
import { connect } from 'react-redux';
import React from 'react';

import * as actions from '../actions/notebooks';
import colors from '../config/colors';
import StatusBar from './StatusBar';

const Nav = styled.nav`
  width: 192px;
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

  :hover {
    padding-left: 32px;
    padding-right: 16px;
  }
`;

export const Notebook = styled(NavItem)`
  font-size: 16px;
`;

export const Note = styled(NavItem)`
  color: ${colors.mutedText};
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
  notes: Array<NoteObject>,
};

export class Notebooks extends React.Component<Props> {
  // TODO: wire this up to real data.
  static defaultProps = {
    notebooks: [
      { id: 'notebook-1', title: 'Ideas' },
      { id: 'notebook-2', title: 'Projects' },
    ],
    notes: [
      { id: 'note-1', title: 'CRDT presentation' },
      { id: 'note-2', title: 'Car appointment details' },
      { id: 'note-3', title: 'Useful vim mappings' },
      { id: 'note-4', title: 'To do list' },
      { id: 'note-5', title: 'Furniture analysis' },
    ],
  };

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
    return (
      <Note key={note.id} onClick={() => this.props.editNote(note.id)}>
        {note.title}
      </Note>
    );
  };
}

const mapDispatchToProps = {
  editNote: actions.editNote,
};

export default connect(
  null,
  mapDispatchToProps
)(Notebooks);
