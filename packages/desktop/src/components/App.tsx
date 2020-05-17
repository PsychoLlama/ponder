import styled from 'styled-components';
import React from 'react';

import colors from '../config/colors';
import Navigation from './navigation/Navigation';
import Content from './Content';

// Height of the transparent title bar.
const TITLE_BAR_HEIGHT = '26px';

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
  height: ${TITLE_BAR_HEIGHT};
`;

const AppContent = styled.main`
  flex-grow: 1;
  display: flex;
  height: calc(100vh - ${TITLE_BAR_HEIGHT});
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
