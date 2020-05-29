import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import DOM from 'react-dom';
import React from 'react';

import createStore from './utils/redux-store';
import App from './components/App';
import colors from './config/colors';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.background};
    margin: 0;
  }
`;

(async () => {
  const store = await createStore();

  DOM.render(
    <Provider store={store}>
      <>
        <GlobalStyle />
        <App />
      </>
    </Provider>,
    document.getElementById('app-root')
  );
})();
