import '@storybook/addon-actions/register';
import '@storybook/addon-knobs/register';

import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

export const decorators = [withKnobs, centered];
