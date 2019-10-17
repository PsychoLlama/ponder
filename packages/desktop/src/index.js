// @flow
import { Provider } from 'react-redux';
import DOM from 'react-dom';
import React from 'react';

import createStore from './utils/redux-store';
import App from './components/App';

import './global.css';

const container: HTMLDivElement = (document.getElementById('app-root'): any);

(async () => {
  const store = await createStore();

  DOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  );
})();
