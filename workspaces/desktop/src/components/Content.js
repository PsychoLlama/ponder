import styled from 'styled-components';
import React from 'react';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`;

const NoteSection = styled.div``;

const BottomPadding = styled.div`
  min-height: 32vh;
  flex-grow: 1;
`;

export class Content extends React.Component {
  render() {
    return (
      <Container>
        <NoteSection />
        <BottomPadding />
      </Container>
    );
  }
}

export default Content;
