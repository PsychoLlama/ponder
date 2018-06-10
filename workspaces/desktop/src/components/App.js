import styled from 'styled-components';
import React from 'react';

import Navigation from './Navigation';
import colors from '../config/colors';
import Content from './Content';

const Container = styled.div`
  min-height: 100vh;
  font-family: 'Helvetica Neue', helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  color: ${colors.text};
  font-size: 14px;
`;

const TitleBar = styled.div`
  -webkit-app-region: drag;
  -webkit-user-select: none;
  height: 26px; // Height of the Mac title bar.
`;

const AppContent = styled.main`
  flex-grow: 1;
  display: flex;
`;

export const App = () => (
  <Container>
    <TitleBar />

    <AppContent>
      <Navigation />
      <Content />
    </AppContent>
  </Container>
);

export default App;
