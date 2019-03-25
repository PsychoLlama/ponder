// @flow
import { Input, MarkdownEditor } from '@ponder/ui';
import styled from 'styled-components';
import { connect } from 'react-redux';
import React from 'react';

import type { ReduxState } from '../types/redux-store';
import { translate } from '../utils/translation';

const Container = styled.article`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const noop = () => {};

type Props = {
  title: string,
};

export class Note extends React.Component<Props> {
  render() {
    const { title } = this.props;

    return (
      <Container>
        <Input
          placeholder={translate('Untitled Note')}
          onChange={noop}
          value={title}
        />

        <MarkdownEditor />
      </Container>
    );
  }
}

export const mapStateToProps = ({ navigation, notebooks }: ReduxState) => {
  const { selectedNoteId } = notebooks;
  const note = navigation.items.find(note => note.id === selectedNoteId);

  if (!note) {
    throw new Error(`No note has been selected.`);
  }

  return {
    title: note.title,
  };
};

export default connect(mapStateToProps)(Note);
