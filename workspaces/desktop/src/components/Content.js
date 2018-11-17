// @flow
import styled from 'styled-components';
import React from 'react';

import StatusBar from './StatusBar';

const Container = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const NoteContainer = styled.article`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100%;
  flex-grow: 1;
`;

const NoteSection = styled.div``;

const BottomPadding = styled.div`
  min-height: 32vh;
  flex-grow: 1;
`;

type Props = {};

export class Content extends React.Component<Props> {
  render() {
    return (
      <Container>
        <NoteContainer>
          <NoteSection />
          <BottomPadding />
        </NoteContainer>

        <StatusBar />
      </Container>
    );
  }
}

export default Content;
