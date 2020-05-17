// @flow
import styled from 'styled-components';
import { connect } from 'react-redux';
import React from 'react';
import { EntityType, Note, Notebook } from '@ponder/sdk';

import { getNotebookId } from '../../selectors/notebooks';
import { ReduxState } from '../../types/redux-store';
import * as actions from '../../actions/notebook';
import StatusBar from '../StatusBar';
import NavItem from './NavItem';

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

interface NotebookEntry {
  type: EntityType;
  id: string;
}

interface Props {
  closeNote: typeof actions.closeNote;
  entries: Array<NotebookEntry>;
  selectedNoteId: string | null;
}

export class Navigation extends React.Component<Props> {
  nav: HTMLElement | null = null;

  render() {
    const { entries } = this.props;
    const notes = entries.filter(
      (entry: NotebookEntry) => entry.type === EntityType.Note
    );

    const notebooks = entries.filter(
      (entry: NotebookEntry) => entry.type === EntityType.Notebook
    );

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
  closeNote = (event: React.SyntheticEvent<HTMLElement>) => {
    if (event.target !== this.nav) return;
    this.props.closeNote();
  };

  renderNotebook = (notebook: NotebookEntry) => {
    return (
      <NavItem type={EntityType.Notebook} id={notebook.id} key={notebook.id} />
    );
  };

  renderNote = (note: NotebookEntry) => {
    return <NavItem type={EntityType.Note} key={note.id} id={note.id} />;
  };
}

const DEFAULT_ENTRIES: Array<NotebookEntry> = [];

export const mapStateToProps = (state: ReduxState) => {
  const notebookId = getNotebookId(state);
  const notebook = state.notebooks[notebookId];
  const entries = notebook ? notebook.contents : DEFAULT_ENTRIES;

  return {
    selectedNoteId: state.navigation.note,
    entries,
  };
};

const mapDispatchToProps = {
  closeNote: actions.closeNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
