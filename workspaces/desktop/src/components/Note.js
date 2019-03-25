// @flow
import { Input, MarkdownEditor } from '@ponder/ui';
import styled from 'styled-components';
import { connect } from 'react-redux';
import React from 'react';

import type { ReduxState } from '../types/redux-store';
import { translate } from '../utils/translation';
import * as actions from '../actions/notebooks';

const Container = styled.article`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

type Props = {
  renameNote: typeof actions.renameNote,
  noteId: string,
  title: string,
};

export class Note extends React.Component<Props> {
  render() {
    const { title } = this.props;

    return (
      <Container>
        <Input
          placeholder={translate('Untitled Note')}
          onChange={this.renameNote}
          value={title}
        />

        <MarkdownEditor />
      </Container>
    );
  }

  renameNote = (newTitle: string) => {
    this.props.renameNote({
      id: this.props.noteId,
      title: newTitle,
    });
  };
}

export const mapStateToProps = ({ navigation, notebooks }: ReduxState) => {
  const { selectedNoteId } = notebooks;
  const note = navigation.items.find(note => note.id === selectedNoteId);

  if (!note) {
    throw new Error(`No note has been selected.`);
  }

  return {
    noteId: selectedNoteId,
    title: note.title,
  };
};

const mapDispatchToProps = {
  renameNote: actions.renameNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
