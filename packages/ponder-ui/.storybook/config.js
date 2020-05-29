import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

addDecorator(withKnobs);
addDecorator(centered);
