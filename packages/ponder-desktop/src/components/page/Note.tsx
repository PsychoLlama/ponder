import { Input } from '@ponder/ui';
import styled from 'styled-components';
import assert from 'minimalistic-assert';
import { connect } from 'react-redux';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { ReduxState } from '../../types/redux-store';
import { translate } from '../../utils/translation';
import * as actions from '../../actions/notebook';
import Section from './Section';
import colors from '../../config/colors';
import StatusBar from '../StatusBar';
import { getNotebookId } from '../../selectors/notebooks';

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-width: 52rem;
`;

const NoteControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageContainer = styled.article`
  background-color: white;
  box-shadow: 0 2px 4px ${colors.shadow};
  display: flex;
  flex-direction: column;
  border-radius: 2px 2px 0 0;
  flex-grow: 1;
`;

export const DeleteNote = styled.button`
  color: ${colors.mutedText};
  appearance: none;
  border: none;
  padding: 0 8px;
  background-color: transparent;
  font-size: 16px;

  :hover,
  :focus {
    color: ${colors.primary};
    outline: none;
  }
`;

const PageStatus = styled(StatusBar)`
  background-color: white;
`;

interface Props {
  renameNote: typeof actions.renameNote;
  deleteNote: typeof actions.deleteNote;
  noteId: string;
  notebookId: string;
  title: string;
  sections: Array<string>;
}

export class Note extends React.Component<Props> {
  render() {
    const { title, sections } = this.props;

    return (
      <Container>
        <NoteControls>
          <Input
            placeholder={translate('Untitled Note')}
            onChange={this.renameNote}
            value={title}
          />

          <DeleteNote onClick={this.deleteNote}>
            <FaTrashAlt />
          </DeleteNote>
        </NoteControls>

        <PageContainer>{sections.map(this.renderSection)}</PageContainer>

        <PageStatus />
      </Container>
    );
  }

  renderSection = (sectionId: string, index: number) => {
    const { noteId } = this.props;

    return (
      <Section
        noteId={noteId}
        key={sectionId}
        id={sectionId}
        sectionIndex={index}
      />
    );
  };

  deleteNote = () => {
    const { noteId, notebookId } = this.props;

    this.props.deleteNote({ noteId, notebookId });
  };

  renameNote = (newTitle: string) => {
    this.props.renameNote({
      id: this.props.noteId,
      title: newTitle,
    });
  };
}

export const mapStateToProps = (state: ReduxState) => {
  const notebookId = getNotebookId(state);
  const noteId = state.navigation.note as string;

  const note = state.notes[noteId];
  assert(note, 'No note has been selected.');

  return {
    noteId,
    notebookId,
    title: note.title,
    sections: note.sections,
  };
};

const mapDispatchToProps = {
  renameNote: actions.renameNote,
  deleteNote: actions.deleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
