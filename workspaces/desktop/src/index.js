// @flow
import { Provider } from 'react-redux';
import DOM from 'react-dom';
import React from 'react';

import createStore from './utils/redux-store';
import App from './components/App';

import './global.css';

const container: HTMLDivElement = (document.getElementById('app-root'): any);
DOM.render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
  container
);
