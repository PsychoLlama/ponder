// @flow
import styled from 'styled-components';
import { connect } from 'react-redux';
import React from 'react';

import { getNotebookId } from '../../selectors/notebooks';
import type { ReduxState } from '../../types/redux-store';
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

type NotebookEntry = {
  type: 'note' | 'notebook',
  id: string,
};

type Props = {
  closeNote: typeof actions.closeNote,
  editNote: typeof actions.editNote,
  entries: Array<NotebookEntry>,
  selectedNoteId: string | null,
};

export class Navigation extends React.Component<Props> {
  nav: HTMLElement | null;

  static defaultProps = {
    entries: [],
  };

  render() {
    const { entries } = this.props;
    const notebooks = entries.filter(entry => entry.type === 'notebook');
    const notes = entries.filter(entry => entry.type === 'note');

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

  renderNotebook = (notebook: NotebookEntry) => {
    return <NavItem type="notebook" id={notebook.id} key={notebook.id} />;
  };

  renderNote = (note: NotebookEntry) => {
    return <NavItem type="note" key={note.id} id={note.id} />;
  };
}

export const mapStateToProps = (state: ReduxState) => {
  const notebookId = getNotebookId(state);
  const notebook = state.notebooks[notebookId];
  const entries = notebook ? notebook.contents : undefined;

  return {
    selectedNoteId: state.navigation.note,
    entries,
  };
};

const mapDispatchToProps = {
  closeNote: actions.closeNote,
  editNote: actions.editNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
