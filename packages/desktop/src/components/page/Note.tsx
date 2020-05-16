// @flow
import { Input } from '@ponder/ui';
import styled from 'styled-components';
import assert from 'minimalistic-assert';
import { connect } from 'react-redux';
import React from 'react';

import { ReduxState } from '../../types/redux-store';
import { translate } from '../../utils/translation';
import * as actions from '../../actions/notebook';
import Section from './Section';

const Container = styled.article`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
        <Input
          placeholder={translate('Untitled Note')}
          onChange={this.renameNote}
          value={title}
        />

        {sections.map(this.renderSection)}
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
  const note = notes[navigation.note as string];
  assert(note, 'No note has been selected.');

  return {
    noteId: navigation.note,
    title: note.title,
    sections: note.sections,
  };
};

const mapDispatchToProps = {
  renameNote: actions.renameNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
