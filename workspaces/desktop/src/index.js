// @flow
import DOM from 'react-dom';
import React from 'react';

import App from './components/App';

import './global.css';

const container: HTMLDivElement = (document.getElementById('app-root'): any);
DOM.render(<App />, container);
