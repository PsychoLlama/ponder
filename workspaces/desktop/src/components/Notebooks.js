// @flow
import { createSelector } from 'reselect';
import styled from 'styled-components';
import { connect } from 'react-redux';
import React from 'react';

import type { ReduxState } from '../types/redux-store';
import { translate } from '../utils/translation';
import * as actions from '../actions/notebook';
import colors from '../config/colors';
import StatusBar from './StatusBar';

export const Nav = styled.nav`
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
  closeNote: typeof actions.closeNote,
  editNote: typeof actions.editNote,
  notebooks: Array<NoteCollection>,
  selectedNoteId: string | null,
  notes: Array<NoteObject>,
};

export class Notebooks extends React.Component<Props> {
  nav: HTMLElement | null;

  render() {
    const { notes, notebooks } = this.props;

    return (
      <Sidebar>
        <Nav onClick={this.closeNote} ref={this.setNavRef}>
          <List>
            {notebooks.map(this.renderNotebook)}
            {notes.map(this.renderNote)}
          </List>
        </Nav>

        <StatusBar>All</StatusBar>
      </Sidebar>
    );
  }

  setNavRef = (ref: HTMLElement | null) => {
    this.nav = ref;
  };

  // Clicking on an empty part of the navbar should dismiss the note.
  closeNote = (event: SyntheticMouseEvent<HTMLElement>) => {
    if (event.target !== this.nav) return;
    this.props.closeNote();
  };

  renderNotebook = (notebook: NoteCollection) => {
    return (
      <Notebook key={notebook.id}>
        {notebook.title || translate('Untitled Notebook')}
      </Notebook>
    );
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
        {note.title || translate('Untitled Note')}
      </Note>
    );
  };
}

const intoArray = createSelector(
  value => value,
  map => Object.values(map)
);

export const mapStateToProps = ({ notebook }: ReduxState) => ({
  notebooks: intoArray(notebook.contents.notebooks),
  notes: intoArray(notebook.contents.notes),
  selectedNoteId: notebook.selectedNoteId,
});

const mapDispatchToProps = {
  closeNote: actions.closeNote,
  editNote: actions.editNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebooks);
