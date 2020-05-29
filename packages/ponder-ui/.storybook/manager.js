import '@storybook/addon-actions/register';
import '@storybook/addon-knobs/register';

import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import pkg from '../package.json';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: pkg.name,
    brandUrl: pkg.repository,
  }),
});
