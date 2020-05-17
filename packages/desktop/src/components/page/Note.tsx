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

const DeleteNote = styled.button`
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
  noteId: string;
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

          <DeleteNote>
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

  renameNote = (newTitle: string) => {
    this.props.renameNote({
      id: this.props.noteId,
      title: newTitle,
    });
  };
}

export const mapStateToProps = ({ notes, navigation }: ReduxState) => {
  const noteId = navigation.note as string;

  const note = notes[noteId];
  assert(note, 'No note has been selected.');

  return {
    noteId,
    title: note.title,
    sections: note.sections,
  };
};

const mapDispatchToProps = {
  renameNote: actions.renameNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
