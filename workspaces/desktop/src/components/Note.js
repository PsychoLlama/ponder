// @flow
import { Input, MarkdownEditor } from '@ponder/ui';
import styled from 'react-emotion';
import React from 'react';

import { translate } from '../utils/translation';

const Container = styled('article')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const noop = () => {};

type Props = {};

export class Note extends React.Component<Props> {
  render() {
    return (
      <Container>
        <Input placeholder={translate('Untitled Note')} onChange={noop} />
        <MarkdownEditor />
      </Container>
    );
  }
}

export default Note;
