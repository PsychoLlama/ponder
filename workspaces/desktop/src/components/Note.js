// @flow
import { Input, MarkdownEditor } from '@ponder/ui';
import styled from 'styled-components';
import assert from 'minimalistic-assert';
import { connect } from 'react-redux';
import React from 'react';

import type { ReduxState } from '../types/redux-store';
import { translate } from '../utils/translation';
import * as actions from '../actions/notebook';

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

export const mapStateToProps = ({ notes, navigation }: ReduxState) => {
  const note = notes[(navigation.note: any)];
  assert(note, 'No note has been selected.');

  return {
    noteId: navigation.note,
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
