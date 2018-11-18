import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import centered from '@storybook/addon-centered';

import pkg from '../package.json';

addDecorator(centered);
addDecorator(
  withOptions({
    url: pkg.repository,
    name: '@ponder/ui',
  })
);

// Import all files ending in *.stories.js for side effects.
const req = require.context('../src/stories', true, /\.stories\.js$/);
const loadStories = () => req.keys().forEach(file => req(file));

configure(loadStories, module);
