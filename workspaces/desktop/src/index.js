import DOM from 'react-dom';
import React from 'react';

import App from './components/App';

import './global.css';

const container = document.getElementById('app-root');
DOM.render(<App />, container);
